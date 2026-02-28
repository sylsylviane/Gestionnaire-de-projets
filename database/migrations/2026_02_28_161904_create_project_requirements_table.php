<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Exécuter les migrations.
     */
    public function up(): void
    {
        Schema::create('project_requirements', function (Blueprint $table) {
            $table->id();

            $table->foreignId('project_id')->constrained()->cascadeOnDelete();

            $table->string('type');
            // electrical, drainage, sleeves, elevator

            $table->enum('status', [
                'pending',
                'completed',
                'not_applicable'
            ])->default('pending');

            // Spécifique à elevator
            $table->boolean('is_compliant')->nullable();
            $table->boolean('sprinkler_required')->nullable();

            $table->timestamp('completed_at')->nullable();
            $table->foreignId('completed_by')->nullable()->constrained('users');

            $table->timestamps();
        });
    }

    /**
     * Inverser les migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_requirements');
    }
};
