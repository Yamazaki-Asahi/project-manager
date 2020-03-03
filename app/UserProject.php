<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserProject extends Model
{
    public function project() {
		return $this->belongsTo('App\project');
	}
	public function user() {
		return $this->belongsTo('App\User');
	}
}
