'use strict';

const DataManager = require('./DataManager');
const GuildChannel = require('../structures/GuildChannel');

/**
 * Manages API methods for CategoryChannels' children.
 * @extends {DataManager}
 */
class CategoryChannelChildManager extends DataManager {
  constructor(channel) {
    super(channel.client, GuildChannel);
    /**
     * The category channel this manager belongs to
     * @type {CategoryChannel}
     */
    this.channel = channel;
  }

  /**
   * The channels that are a part of this category
   * @type {Collection<Snowflake, GuildChannel>}
   * @readonly
   */
  get cache() {
    return this.guild.channels.cache.filter(c => c.parentId === this.channel.id);
  }

  /**
   * The guild this manager belongs to
   * @type {Guild}
   * @readonly
   */
  get guild() {
    return this.channel.guild;
  }

  /**
   * Options for creating a channel using {@link CategoryChannel#createChannel}.
   * @typedef {Object} CategoryCreateChannelOptions
   * @property {ChannelType} [type=ChannelType.GuildText] The type of the new channel.
   * @property {string} [topic] The topic for the new channel
   * @property {boolean} [nsfw] Whether the new channel is NSFW
   * @property {number} [bitrate] Bitrate of the new channel in bits (only voice)
   * @property {number} [userLimit] Maximum amount of users allowed in the new channel (only voice)
   * @property {OverwriteResolvable[]|Collection<Snowflake, OverwriteResolvable>} [permissionOverwrites]
   * Permission overwrites of the new channel
   * @property {number} [position] Position of the new channel
   * @property {number} [rateLimitPerUser] The rate limit per user (slowmode) for the new channel in seconds
   * @property {string} [rtcRegion] The specific region of the new channel.
   * @property {VideoQualityMode} [videoQualityMode] The camera video quality mode of the voice channel
   * @property {string} [reason] Reason for creating the new channel
   */

  /**
   * Creates a new channel within this category.
   * <info>You cannot create a channel of type {@link ChannelType.GuildCategory} inside a CategoryChannel.</info>
   * @param {string} name The name of the new channel
   * @param {CategoryCreateChannelOptions} options Options for creating the new channel
   * @returns {Promise<GuildChannel>}
   */
  create(name, options) {
    return this.guild.channels.create(name, {
      ...options,
      parent: this.channel.id,
    });
  }
}

module.exports = CategoryChannelChildManager;
