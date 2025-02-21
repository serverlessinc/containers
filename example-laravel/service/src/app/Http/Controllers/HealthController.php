<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HealthController extends Controller
{
    public function check()
    {
        return response('OK', 200);
    }

    public function info()
    {
        return response()->json([
            'namespace' => env('SERVERLESS_NAMESPACE'),
            'container_name' => env('SERVERLESS_CONTAINER_NAME'),
            'stage' => env('SERVERLESS_STAGE'),
            'compute_type' => env('SERVERLESS_COMPUTE_TYPE'),
            'local' => env('SERVERLESS_LOCAL')
        ]);
    }
}
