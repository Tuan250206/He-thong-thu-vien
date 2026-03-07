/**
 * storage.js – localStorage wrapper + data initializer
 * Hệ thống Thư viện
 */

'use strict';

const Storage = {
  /**
   * Get a value from localStorage (auto-parses JSON)
   * @param {string} key
   * @returns {*} parsed value or null
   */
  get(key) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.error('[Storage.get] Error parsing key:', key, e);
      return null;
    }
  },

  /**
   * Store a value in localStorage (auto-serializes JSON)
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('[Storage.set] Error storing key:', key, e);
    }
  },

  /**
   * Remove a specific key from localStorage
   * @param {string} key
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('[Storage.remove] Error removing key:', key, e);
    }
  },

  /**
   * Clear all library-related keys (preserves unrelated data)
   */
  clear() {
    const libKeys = [
      'initialized', 'users', 'admins', 'docGia', 'sach',
      'phieuMuon', 'phieuPhat', 'phieuDatCho', 'phieuNhap',
      'phieuXuat', 'nhaCungCap'
    ];
    libKeys.forEach(k => this.remove(k));
  },

  /**
   * Reset all data and re-initialize from MOCK_DATA
   */
  reset() {
    this.clear();
    this.init();
  },

  /**
   * Initialize all collections from MOCK_DATA if not already done.
   * Called once on first page load.
   */
  init() {
    if (this.get('initialized')) return;

    // Guard: MOCK_DATA must be loaded before storage.js runs
    if (typeof MOCK_DATA === 'undefined') {
      console.error('[Storage.init] MOCK_DATA is not defined. Make sure data.js is loaded first.');
      return;
    }

    this.set('users',        MOCK_DATA.users);
    this.set('admins',       MOCK_DATA.admins);
    this.set('docGia',       MOCK_DATA.docGia);
    this.set('sach',         MOCK_DATA.sach);
    this.set('phieuMuon',    MOCK_DATA.phieuMuon);
    this.set('phieuPhat',    MOCK_DATA.phieuPhat);
    this.set('phieuDatCho',  MOCK_DATA.phieuDatCho);
    this.set('phieuNhap',    MOCK_DATA.phieuNhap);
    this.set('phieuXuat',    MOCK_DATA.phieuXuat);
    this.set('nhaCungCap',   MOCK_DATA.nhaCungCap);

    this.set('initialized', true);
    console.info('[Storage.init] Mock data initialized successfully.');
  },

  /* ── Convenience helpers ───────────────────────────── */

  /** Get all items in a collection */
  getAll(collection) {
    return this.get(collection) || [];
  },

  /** Replace entire collection */
  setAll(collection, items) {
    this.set(collection, items);
  },

  /** Find a single item by a field value */
  findOne(collection, field, value) {
    const items = this.getAll(collection);
    return items.find(item => item[field] === value) || null;
  },

  /** Find multiple items matching a field value */
  findMany(collection, field, value) {
    const items = this.getAll(collection);
    return items.filter(item => item[field] === value);
  },

  /** Add a new item to a collection */
  addItem(collection, item) {
    const items = this.getAll(collection);
    items.push(item);
    this.set(collection, items);
    return item;
  },

  /** Update an item in a collection by matching field */
  updateItem(collection, matchField, matchValue, updates) {
    const items = this.getAll(collection);
    const idx = items.findIndex(item => item[matchField] === matchValue);
    if (idx === -1) return false;
    items[idx] = { ...items[idx], ...updates };
    this.set(collection, items);
    return items[idx];
  },

  /** Remove an item from a collection by matching field */
  removeItem(collection, matchField, matchValue) {
    const items = this.getAll(collection);
    const filtered = items.filter(item => item[matchField] !== matchValue);
    if (filtered.length === items.length) return false;
    this.set(collection, filtered);
    return true;
  },

  /** Count items in a collection (optionally filtered) */
  count(collection, filterFn) {
    const items = this.getAll(collection);
    return filterFn ? items.filter(filterFn).length : items.length;
  }
};
