

CREATE TABLE public.assignments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  subject VARCHAR(100) NOT NULL,
  due_date DATE,
  teacher_id uuid NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT assignments_pkey PRIMARY KEY (id)
);


