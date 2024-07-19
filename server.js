import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors())

const port = process.env.PORT || 3000;

app.post('/users', async (request, response) => {
	await prisma.user.create({
		data: {
			name: request.body.name,
			lastname: request.body.lastname,
			email: request.body.email,
			password: request.body.password
		}
	});
	
	response.status(201).json(request.body);
});

app.get('/users', async (request, response) => {
	const users = await prisma.user.findMany()
	
	response.status(200).json(users);
});

app.put('/users/:id', async (request, response) => {
	await prisma.user.update({
		where: {
			id: request.params.id
		},		
		data: {
			name: request.body.name,
			lastname: request.body.lastname,
			email: request.body.email,
			password: request.body.password
		}
	});
	
	response.status(201).json(request.body);
});

app.delete('/users/:id', async (request, response) => {
	await prisma.user.delete({
		where: {
			id: request.params.id
		}
	});

	response.status(200).json({ message: "Usuário deletado com sucesso !"})
});

app.listen(3000);

//database-password - 0NNJEQbhHJXAbbc4