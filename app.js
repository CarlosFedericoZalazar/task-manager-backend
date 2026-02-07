import express from 'express';
import cors from "cors";
import taskRoutes from './routes/task_routes.js';


import { supabase } from "./db/supabase.js";

const app = express();

// 👇👇 ESTO SIEMPRE VA ANTES DE LAS RUTAS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// 👇 tus rutas recién acá
app.use('/task', taskRoutes);

app.get("/health", async (req, res) => {
    const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .limit(1);

    if (error) {
        return res.status(500).json({ ok: false, error });
    }

    res.json({ ok: true, data });
});

app.post("/tasks", async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ ok: false, error: "No auth" });
    }

    const { texto } = req.body;

    const { data, error } = await supabase
        .from("tasks")
        .insert([
            {
                texto,
                completada: false,
                user_id: req.user.sub   // 👈 este es el uid de Supabase
            }
        ])
        .select();

    if (error) {
        return res.status(500).json({ ok: false, error });
    }

    res.json({ ok: true, data });
});




app.listen(3000, () => console.log("Server running on port 3000"));