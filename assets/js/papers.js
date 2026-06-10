/* global window, document */

(function () {
  const baseurl = (window.PWL_BASEURL || '').replace(/\/$/, '');
  const papers = window.PWL_PAPERS || [];
  const fields = window.PWL_FIELDS || [];

  const elSearch = document.getElementById('papers-search');
  const elFilters = document.getElementById('papers-filters');
  const elList = document.getElementById('papers-list');

  if (!elFilters || !elList) return;

  function normalizeValue(v) {
    if (v === null || v === undefined) return null;
    if (typeof v === 'string') return v.trim();
    return v;
  }

  function asArray(v) {
    if (v === null || v === undefined) return [];
    return Array.isArray(v) ? v : [v];
  }

  function uniq(arr) {
    return Array.from(new Set(arr.filter(Boolean)));
  }

  function compareDesc(a, b) {
    // sort by event_date desc (fallback: title)
    const da = a.event_date || '';
    const db = b.event_date || '';
    if (da !== db) return da < db ? 1 : -1;
    return (a.title || '').localeCompare(b.title || '');
  }

  function rel(url) {
    if (!url) return null;
    // Absolute URLs: keep.
    if (/^https?:\/\//i.test(url)) return url;
    // Relative URLs: prefix with baseurl.
    return baseurl + '/' + url.replace(/^\//, '');
  }

  function collectOptions() {
    const options = {};

    for (const field of fields) {
      const key = field.key;
      const values = [];

      for (const p of papers) {
        const v = normalizeValue(p[key]);
        for (const one of asArray(v)) {
          const n = normalizeValue(one);
          if (n) values.push(n);
        }
      }

      options[key] = uniq(values).sort((a, b) => String(a).localeCompare(String(b)));
    }

    return options;
  }

  function getStateFromUI() {
    const query = (document.getElementById('filter-query')?.value || '').trim().toLowerCase();

    const selected = {};
    for (const field of fields) {
      const key = field.key;
      selected[key] = [];
      const inputs = elFilters.querySelectorAll(`input[data-field="${key}"]:checked`);
      for (const input of inputs) {
        selected[key].push(input.value);
      }
    }

    return { query, selected };
  }

  function matchesQuery(paper, query) {
    if (!query) return true;

    const haystack = [
      paper.title,
      paper.event_title,
      paper.presenter,
      paper.description,
      paper.meetup_url,
      paper.paper_url,
      ...asArray(paper.tags),
      ...asArray(paper.topic)
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return haystack.includes(query);
  }

  function matchesSelected(paper, selected) {
    for (const field of fields) {
      const key = field.key;
      const want = selected[key] || [];
      if (!want.length) continue;

      const got = asArray(normalizeValue(paper[key])).map(String);

      // Intersection
      const ok = want.some((w) => got.includes(String(w)));
      if (!ok) return false;
    }
    return true;
  }

  function renderPaperCard(p) {
    const tags = uniq(asArray(p.tags)).map((t) => `<span class="badge rounded-pill pwl-badge me-1">${escapeHtml(t)}</span>`).join('');
    const topic = uniq(asArray(p.topic)).map((t) => `<span class="badge text-bg-light border me-1">${escapeHtml(t)}</span>`).join('');

    const paperUrl = rel(p.paper_url);
    const slidesUrl = rel(p.slides_url);
    const meetupUrl = rel(p.meetup_url);

    const meta = [
      (p.event_title && p.event_title !== p.title)
        ? `<span class="me-2"><strong>Event:</strong> ${escapeHtml(p.event_title)}</span>`
        : '',
      p.event_date ? `<span class="me-2"><strong>Date:</strong> ${escapeHtml(p.event_date)}</span>` : '',
      p.location ? `<span class="me-2"><strong>Location:</strong> ${escapeHtml(p.location)}</span>` : '',
      p.presenter ? `<span class="me-2"><strong>Presenter:</strong> ${escapeHtml(p.presenter)}</span>` : ''
    ].filter(Boolean).join('');

    const links = [
      meetupUrl ? `<a class="btn btn-sm btn-outline-secondary" href="${escapeAttr(meetupUrl)}" target="_blank" rel="noopener">Meetup</a>` : '',
      paperUrl ? `<a class="btn btn-sm btn-outline-danger" href="${escapeAttr(paperUrl)}" target="_blank" rel="noopener">Paper</a>` : '',
      slidesUrl ? `<a class="btn btn-sm btn-outline-danger" href="${escapeAttr(slidesUrl)}" target="_blank" rel="noopener">Slides</a>` : ''
    ].filter(Boolean).join(' ');

    return `
      <div class="col">
        <div class="card h-100 shadow-sm pwl-card">
          <div class="card-body">
            <h3 class="h5 card-title mb-2">${escapeHtml(p.title || 'Untitled')}</h3>
            <div class="small text-muted mb-2">${meta}</div>
            ${p.description ? `<p class="card-text">${escapeHtml(p.description)}</p>` : ''}
            <div class="mb-2">${topic}</div>
            <div class="mb-3">${tags}</div>
            <div class="d-flex flex-wrap gap-2">${links}</div>
          </div>
        </div>
      </div>
    `;
  }

  function renderList(filtered) {
    if (!filtered.length) {
      elList.innerHTML = '<div class="alert alert-light border">No papers match the current filters.</div>';
      return;
    }

    const cards = filtered.map(renderPaperCard).join('');
    elList.innerHTML = `<div class="row row-cols-1 row-cols-lg-2 g-3">${cards}</div>`;
  }

  function render() {
    const { query, selected } = getStateFromUI();
    const filtered = papers
      .slice()
      .sort(compareDesc)
      .filter((p) => matchesQuery(p, query))
      .filter((p) => matchesSelected(p, selected));

    renderList(filtered);

    const elCount = document.getElementById('papers-count');
    if (elCount) {
      elCount.textContent = `${filtered.length} / ${papers.length}`;
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function escapeAttr(s) {
    return escapeHtml(s);
  }

  function buildUI() {
    const options = collectOptions();

    const fieldsets = fields.map((f) => {
      const key = f.key;
      const label = f.label || key;
      const opts = options[key] || [];

      const checks = opts.map((o, idx) => {
        const id = `filter-${key}-${idx}`;
        return `
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="${escapeAttr(id)}" value="${escapeAttr(o)}" data-field="${escapeAttr(key)}">
            <label class="form-check-label" for="${escapeAttr(id)}">${escapeHtml(o)}</label>
          </div>
        `;
      }).join('');

      return `
        <fieldset class="pwl-fieldset mb-3">
          <legend>${escapeHtml(label)}</legend>
          ${checks || '<div class="text-muted small">(no values)</div>'}
        </fieldset>
      `;
    }).join('');

    const controls = `
      <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
        <div class="pwl-filter-title">Search <span class="text-muted fw-normal">(<span id="papers-count"></span>)</span></div>
        <div class="d-flex flex-column flex-sm-row gap-2">
          <input id="filter-query" class="form-control" type="search" placeholder="Search title, presenter, tags…" aria-label="Search papers">
          <button id="filter-reset" class="btn btn-outline-secondary" type="button">Reset</button>
        </div>
      </div>
    `;

    const hasExistingControls = Boolean(document.getElementById('filter-query') && document.getElementById('filter-reset'));

    if (elSearch) {
      // If the page provides its own search UI (recommended), keep it.
      // Otherwise, inject one into the dedicated container.
      if (!hasExistingControls) {
        elSearch.innerHTML = `<div class="pwl-filter-group">${controls}</div>`;
      }
      // Only the checkbox/radio filters live in the collapsible section.
      elFilters.innerHTML = `<div class="pwl-filter-group">${fieldsets}</div>`;
    } else {
      // Backwards-compatible fallback: render search + filters together.
      elFilters.innerHTML = `
        <div class="pwl-filter-group">
          <div class="mb-3">${controls}</div>
          ${fieldsets}
        </div>
      `;
    }

    elFilters.addEventListener('change', render);
    document.getElementById('filter-query')?.addEventListener('input', render);

    document.getElementById('filter-reset')?.addEventListener('click', () => {
      elFilters.querySelectorAll('input[type="checkbox"]').forEach((i) => { i.checked = false; });
      const q = document.getElementById('filter-query');
      if (q) q.value = '';
      render();
    });

    render();
  }

  buildUI();
})();
