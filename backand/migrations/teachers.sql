

CREATE TABLE public.teachers (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  emp_id VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  classes TEXT[], -- ["9", "10", "11"]
  credits INT DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT teachers_pkey PRIMARY KEY (id)
);

