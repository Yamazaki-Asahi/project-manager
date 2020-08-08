<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\User;
use JWTAuth;

class TasksControllerTest extends TestCase
{
	use RefreshDatabase;
	public function setup(): void
	{
		parent::setUp();
		$this->seed();
	}

	public function testIndex()
    {
		$user = User::find(1);
		$headers = ['Authorization' => 'Bearer '.JWTAuth::fromUser($user)]; //JWTAUTH::fromUser()で特定のユーザーのアクセストークンを発行し、ヘッダーに貼り付け。
		$response = $this->withHeaders($headers)
			->json('GET', '/api/tasks', ['project_id' => 1]);
		$response->assertStatus(200);
		$jsonValues = $response->json(); //返ってきたJSONデータを配列に変換
		$this->assertArrayHasKey('children', $jsonValues[0]); //1つ目のタスクに「children」というkeyが含まれているか？
    }
}
