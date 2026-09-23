'use strict';

/**
 * hotness-level service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::hotness-level.hotness-level');
