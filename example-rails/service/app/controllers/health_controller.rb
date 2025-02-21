class HealthController < ApplicationController
  def check
    render plain: 'OK'
  end

  def info
    render json: {
      namespace: ENV['SERVERLESS_NAMESPACE'],
      container_name: ENV['SERVERLESS_CONTAINER_NAME'],
      stage: ENV['SERVERLESS_STAGE'],
      compute_type: ENV['SERVERLESS_COMPUTE_TYPE'],
      local: ENV['SERVERLESS_LOCAL']
    }
  end
end
