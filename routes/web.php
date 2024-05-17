<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

Route::view('/{any?}', 'dashboard')
    ->where('any', '.*');

Route::post('login', [AuthenticatedSessionController::class, 'store']);
Route::post('logout', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy']);
