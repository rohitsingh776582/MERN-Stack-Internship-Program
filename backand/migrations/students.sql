
CREATE TABLE public.students (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  roll_no VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  class VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_by uuid, -- admin id
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT students_pkey PRIMARY KEY (id)
);

