-- LTC 2.0 demo database schema draft.
-- This is a starting point for a future PostgreSQL/MySQL implementation.

CREATE TABLE users (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  role VARCHAR(40) NOT NULL,
  email VARCHAR(160),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  industry VARCHAR(120),
  region VARCHAR(120),
  customer_level VARCHAR(40),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE opportunities (
  id VARCHAR(64) PRIMARY KEY,
  customer_id VARCHAR(64),
  owner_id VARCHAR(64),
  name VARCHAR(240) NOT NULL,
  amount DECIMAL(14, 2) DEFAULT 0,
  win_rate INTEGER DEFAULT 0,
  rights_level VARCHAR(10) DEFAULT 'L0',
  risk_level VARCHAR(20) DEFAULT '低',
  completeness INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE interactions (
  id VARCHAR(64) PRIMARY KEY,
  opportunity_id VARCHAR(64) NOT NULL,
  input_text TEXT NOT NULL,
  extracted_signals TEXT,
  score_snapshot TEXT,
  change_summary TEXT,
  created_by VARCHAR(64),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
  id VARCHAR(64) PRIMARY KEY,
  customer_id VARCHAR(64),
  opportunity_id VARCHAR(64),
  name VARCHAR(120) NOT NULL,
  role VARCHAR(120),
  attitude VARCHAR(40),
  influence_level VARCHAR(40)
);

CREATE TABLE risks (
  id VARCHAR(64) PRIMARY KEY,
  opportunity_id VARCHAR(64) NOT NULL,
  risk_type VARCHAR(80) NOT NULL,
  risk_level VARCHAR(20) NOT NULL,
  description TEXT,
  suggestion TEXT,
  status VARCHAR(40) DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id VARCHAR(64) PRIMARY KEY,
  opportunity_id VARCHAR(64) NOT NULL,
  title VARCHAR(240) NOT NULL,
  owner_id VARCHAR(64),
  status VARCHAR(40) DEFAULT 'open',
  due_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resource_requests (
  id VARCHAR(64) PRIMARY KEY,
  opportunity_id VARCHAR(64) NOT NULL,
  request_type VARCHAR(80) NOT NULL,
  owner_name VARCHAR(120),
  priority VARCHAR(20),
  sla VARCHAR(40),
  status VARCHAR(40) DEFAULT 'pending',
  material TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE knowledge_items (
  id VARCHAR(64) PRIMARY KEY,
  keyword VARCHAR(120) NOT NULL,
  title VARCHAR(240) NOT NULL,
  content TEXT,
  source_type VARCHAR(80),
  related_opportunity_id VARCHAR(64),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
