<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Project;

class ProjectsController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth:api');
	}

	public static function index () {
		return Auth::user()->projects()->get();
	}

	public static function show ($id) {
		$project = Project::find($id);
		if (!$project->isJoinedProject()) {
			abort(403);
		}
	}
}
