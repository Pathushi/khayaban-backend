'use strict';

/**
 * hotness-level router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::hotness-level.hotness-level');
