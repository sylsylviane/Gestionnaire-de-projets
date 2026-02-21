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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('project_number')->unique();
            $table->string('project_name');

            $table->enum('building_type', [
                'combustible',
                'incombustible_acier',
                'incombustible_beton',
            ]);

            $table->integer('floors');

            $table->text('description')->nullable();

            // Coordination technique
            $table->boolean('electrical_done')->default(false);
            $table->boolean('sleeves_done')->default(false);
            $table->boolean('drainage_done')->default(false);

            $table->enum('status', [
                'en_cours',
                'termine',
                'suspendu',
            ])->default('en_cours');

            $table->timestamps();
        });
    }

    /**
     * Annuler les migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
