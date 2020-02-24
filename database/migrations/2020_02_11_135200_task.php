<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Task extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::create('tasks', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->unsignedBigInteger('parent_id')->nullable();
			$table->unsignedBigInteger('status_id');
			$table->integer('order');
			$table->string('name');
			$table->text('supplement')->nullable();
			$table->timestamp('deadline', 0)->nullable();
			$table->timestamps();
			$table->foreign('status_id')->references('id')->on('statuses');
			$table->foreign('parent_id')->references('id')->on('tasks');
			$table->softDeletes();
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::dropIfExists('tasks');
    }
}
