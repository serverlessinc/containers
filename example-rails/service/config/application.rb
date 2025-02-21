require_relative "boot"
require "rails"
require "action_controller/railtie"

module RailsApi
  class Application < Rails::Application
    config.load_defaults 7.1
    config.api_only = true
    config.logger = ActiveSupport::Logger.new(STDOUT)
    config.log_level = ENV.fetch('RAILS_LOG_LEVEL', 'info')
    config.hosts.clear
  end
end
