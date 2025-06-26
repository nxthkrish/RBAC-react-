import { setupWorker } from 'msw/browser';
import { db } from './mockDb';
import { HttpResponse, delay, http } from 'msw';

const worker = setupWorker(
  http.post('/api/login', async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    await delay(500);

    const user = db.user.findFirst({
      where: {
        email: { equals: email },
        password: { equals: password },
      },
    });

    if (!user) {
      return HttpResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
  }),

  http.get('/api/users', async () => {
    await delay(500);
    const users = db.user.getAll();
    return HttpResponse.json(users);
  }),

  http.get('/api/users/:id', async ({ params }) => {
    await delay(500);
    const user = db.user.findFirst({
      where: { id: { equals: params.id as string } },
    });
    if (!user) return HttpResponse.json(null, { status: 404 });
    return HttpResponse.json(user);
  }),

  http.post('/api/users', async ({ request }) => {
    await delay(500);
    const data = await request.json();

    // Validate data before using it to create a user
    if (!data || typeof data !== 'object') {
      return HttpResponse.json(
        { message: 'Invalid user data' },
        { status: 400 }
      );
    }

    const user = db.user.create(data);
    return HttpResponse.json(user);
  }),

  http.put('/api/users/:id', async ({ request, params }) => {
    await delay(500);
    const data = await request.json();

    // Validate data before updating user
    if (!data || typeof data !== 'object') {
      return HttpResponse.json(
        { message: 'Invalid user data' },
        { status: 400 }
      );
    }

    const updatedUser = db.user.update({
      where: { id: { equals: params.id as string } },
      data: data as Partial<Record<string, unknown>>,
    });
    if (!updatedUser) return HttpResponse.json(null, { status: 404 });
    return HttpResponse.json(updatedUser);
  }),

  http.delete('/api/users/:id', async ({ params }) => {
    await delay(500);
    const deletedUser = db.user.delete({
      where: { id: { equals: params.id as string } },
    });
    if (!deletedUser) return HttpResponse.json(null, { status: 404 });
    return HttpResponse.json(deletedUser);
  })
);

export { worker };