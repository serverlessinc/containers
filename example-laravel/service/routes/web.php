<?php

use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response('OK');
});

Route::get('/', function () {
    return response()->json([
        'namespace' => env('SERVERLESS_NAMESPACE'),
        'container_name' => env('SERVERLESS_CONTAINER_NAME'),
        'stage' => env('SERVERLESS_STAGE'),
        'compute_type' => env('SERVERLESS_COMPUTE_TYPE'),
        'local' => env('SERVERLESS_LOCAL'),
    ]);
});
