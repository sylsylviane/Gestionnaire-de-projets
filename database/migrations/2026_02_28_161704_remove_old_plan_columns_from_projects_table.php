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
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn([
                'electrical_done',
                'sleeves_done',
                'drainage_done',
            ]);
        });
    }

    /**
     * Inverser les migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->boolean('electrical_done')->default(false);
            $table->boolean('sleeves_done')->default(false);
            $table->boolean('drainage_done')->default(false);
        });
    }
};
