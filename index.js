//Iniciar Express
var express = require("express");
var app = express();

//SupaBase
const createClient = require('@supabase/supabase-js');

const supabaseUrl = 'https://avvyhaqualyfoehcpefd.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);