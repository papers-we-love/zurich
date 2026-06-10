---
layout: default
title: "Past Papers"
permalink: /papers/
---

# Past Papers
---

This page is generated from `_data/papers.yml` in this repository.
To add a new event, open a PR updating that file.

<div id="papers-search" class="mb-3">
  <div class="pwl-filter-group">
    <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
      <div class="pwl-filter-title">Search <span class="text-muted fw-normal">(<span id="papers-count"></span>)</span></div>
      <div class="d-flex flex-column flex-sm-row gap-2">
        <input id="filter-query" class="form-control" type="search" placeholder="Search title, presenter, tags…" aria-label="Search papers">
        <button id="filter-reset" class="btn btn-outline-secondary" type="button">Reset</button>
        <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#papers-filters-collapse" aria-expanded="false" aria-controls="papers-filters-collapse">Filters</button>
      </div>
    </div>
  </div>
</div>

<div class="collapse mb-4" id="papers-filters-collapse">
  <div class="mt-3" id="papers-filters"></div>
</div>

<div id="papers-list"></div>

<noscript>
  <div class="alert alert-warning">
    Filtering requires JavaScript.
  </div>
</noscript>

<script>
  window.PWL_BASEURL = {{ site.baseurl | jsonify }};
  window.PWL_PAPERS = {{ site.data.papers | jsonify }};
  // Exclude the presenter and tags fields from the filter UI.
  window.PWL_FIELDS = {{ site.data.paper_fields
    | where_exp: "f", "f.key != 'presenter'"
    | where_exp: "f", "f.key != 'tags'"
    | jsonify
  }};
</script>
<script src="{{ "/assets/js/papers.js" | relative_url }}"></script>
