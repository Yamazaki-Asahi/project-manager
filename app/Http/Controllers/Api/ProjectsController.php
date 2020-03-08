<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ProjectsController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth:api');
	}

	public static function index () {
		return Auth::user()->projects()->get();
	}
}
