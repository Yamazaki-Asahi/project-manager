<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Comment;
use App\Project;

class CommentsController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth:api');
	}

    public function index(Request $request)
    {
//		$project = Project::find($request->input('project_id'));
//		$task = Project::find($request->input('task_id'));
//		$project->isJoinedProject();
//		return $task->comments();
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
