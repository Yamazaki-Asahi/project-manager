<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::name('api.')->group(function () {
	Route::group(['prefix' => 'auth'], function ($router) {
		Route::post('login', 'Api\AuthController@login');
		Route::post('logout', 'Api\AuthController@logout');
		Route::post('refresh', 'Api\AuthController@refresh');
		Route::post('me', 'Api\AuthController@me');
	});
	Route::resource('/tasks', 'Api\TasksController');
	Route::resource('/projects', 'Api\ProjectsController');
	Route::resource('/comments', 'Api\CommentsController');
	Route::get('/statuses', 'Api\StatusesController@index');
});
