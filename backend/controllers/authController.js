import supabase from "../config/supabase.js";

// user register
export const register = async (req, res) => {
	const {
		email,
		password,
		firstName,
		lastNname,
		profileImage,
		phone,
		gender,
		birthDate,
		role,
		address,
	} = req.body;

	// 🔹 Créer un utilisateur avec Supabase Auth
	const { data, error } = await supabase.auth.signUp({ email, password });

	if (error) return res.status(400).json({ error: error.message });

	const userId = data.user.id; // ID généré par Supabase Auth

	// 🔹 Insérer l'utilisateur dans la table `users`
	const { error: insertError } = await supabase.from("users").insert([
		{
			id: userId,
			email,
			phone,
			gender,
			birth_date: birthDate,
			password,
			first_name: firstName,
			last_name: lastNname,
			profile_picture: profileImage,
			role,
			address,
		},
	]);

	if (insertError) return res.status(400).json({ error: insertError.message });

	res.status(201).json({ message: "User registered successfully", userId });
};

// user login
export const login = async (req, res) => {
	const { email, password } = req.body;

	// 🔹 Connexion avec Supabase Auth
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) return res.status(400).json({ error: error.message });
	const userId = data.user.id; // ID de l'utilisateur connecté

	// 🔹 Récupérer les infos du user dans la table `users`
	const { data: user, error: userError } = await supabase
		.from("users")
		.select("*")
		.eq("id", userId)
		.single();

	if (userError) return res.status(400).json({ error: userError.message });

	res.status(200).json({ user, token: data.session.access_token });
};
