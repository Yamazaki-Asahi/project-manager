<?php

namespace App\Http\Controllers\Api;

use App\Status;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StatusesController extends Controller
{
    public function index()
    {
		$statuses = Status::all();
		return $statuses;
    }
}
