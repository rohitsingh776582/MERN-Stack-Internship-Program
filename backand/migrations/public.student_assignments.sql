
CREATE TABLE public.student_assignments (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    assignment_id uuid NOT NULL,
    student_id uuid NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'completed')),
    submission_text TEXT,
    marks INT DEFAULT 0,
    submitted_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT student_assignments_pkey PRIMARY KEY (id),
    CONSTRAINT fk_assignment FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    CONSTRAINT unique_assignment_student UNIQUE (assignment_id, student_id)
);

