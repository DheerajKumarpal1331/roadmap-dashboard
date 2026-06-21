export const SKILLS = {
  // ── PYTHON ──
  "python-basics": {
    name: "Python Basics",
    category: "Python",
    subtopics: ["Basic Syntax", "Variables & Data Types", "Conditionals", "Loops", "Type Casting", "Exceptions", "Functions & Builtins", "Lists, Tuples, Sets", "Dictionaries"],
    roles: ["python", "ml-engineer", "mlops", "data-analyst", "data-engineer", "ai-data-scientist", "ai-engineer"]
  },
  "python-oop": {
    name: "Object Oriented Programming",
    category: "Python",
    subtopics: ["Classes", "Inheritance", "Methods & Dunder Methods"],
    roles: ["python", "ml-engineer", "data-engineer"]
  },
  "python-advanced": {
    name: "Advanced Python Concepts",
    category: "Python",
    subtopics: ["Lambdas", "Decorators", "Iterators", "Regular Expressions", "List Comprehensions", "Generator Expressions", "Context Manager", "Paradigms"],
    roles: ["python"]
  },
  "python-ds-algo": {
    name: "Data Structures & Algorithms",
    category: "Python",
    subtopics: ["Arrays & Linked Lists", "Heaps, Stacks & Queues", "Hash Tables", "Binary Search Tree", "Recursion", "Sorting Algorithms", "Modules"],
    roles: ["python", "ml-engineer", "ai-data-scientist", "data-engineer"]
  },
  "python-packages": {
    name: "Package Managers",
    category: "Python",
    subtopics: ["PyPI", "Pip", "Conda", "Poetry", "uv"],
    roles: ["python"]
  },
  "python-environments": {
    name: "Python Environments",
    category: "Python",
    subtopics: ["virtualenv", "pyenv", "Pipenv", "pyproject.toml"],
    roles: ["python"]
  },
  "python-static-typing": {
    name: "Static Typing",
    category: "Python",
    subtopics: ["typing", "mypy", "pyright", "Pydantic", "pyre"],
    roles: ["python"]
  },
  "python-testing": {
    name: "Python Testing",
    category: "Python",
    subtopics: ["pytest", "unittest / pyUnit", "doctest", "nose", "tox"],
    roles: ["python"]
  },
  "python-frameworks": {
    name: "Python Frameworks",
    category: "Python",
    subtopics: ["FastAPI", "Django", "Flask", "Tornado", "Sanic", "aiohttp", "gevent"],
    roles: ["python"]
  },
  "python-concurrency": {
    name: "Concurrency",
    category: "Python",
    subtopics: ["GIL", "Threading", "Multiprocessing", "Asynchrony"],
    roles: ["python"]
  },
  "python-code-quality": {
    name: "Code Quality & Documentation",
    category: "Python",
    subtopics: ["ruff", "black", "yapf", "Sphinx", "Code Formatting", "Documentation"],
    roles: ["python"]
  },
  "python-essential-libs": {
    name: "Essential Data Libraries",
    category: "Python",
    subtopics: ["NumPy", "Pandas", "Matplotlib", "Seaborn"],
    roles: ["python", "ml-engineer", "ai-data-scientist", "data-analyst"]
  },

  // ── SQL ──
  "sql-basics": {
    name: "SQL Basics",
    category: "SQL",
    subtopics: ["Basic SQL Syntax", "SQL Keywords", "Data Types", "Operators", "SELECT / INSERT / DELETE / UPDATE", "What are Relational Databases", "SQL vs NoSQL", "RDBMS Benefits & Limitations"],
    roles: ["sql", "data-analyst", "data-engineer", "ml-engineer", "ai-data-scientist"]
  },
  "sql-ddl-dml": {
    name: "DDL & DML",
    category: "SQL",
    subtopics: ["CREATE TABLE", "ALTER TABLE", "DROP TABLE", "TRUNCATE TABLE", "FROM, WHERE, JOINs", "GROUP BY, ORDER BY, HAVING", "Primary Key", "Foreign Key", "Unique / NOT NULL / CHECK"],
    roles: ["sql", "data-engineer"]
  },
  "sql-joins": {
    name: "JOINs & Aggregate Queries",
    category: "SQL",
    subtopics: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN", "Self Join", "Cross Join", "SUM / COUNT / AVG / MIN / MAX", "GROUP BY & HAVING"],
    roles: ["sql", "data-engineer", "data-analyst"]
  },
  "sql-subqueries": {
    name: "Subqueries",
    category: "SQL",
    subtopics: ["Scalar Subqueries", "Column Subqueries", "Row & Table Subqueries", "Nested Subqueries", "Correlated Subqueries"],
    roles: ["sql"]
  },
  "sql-advanced-functions": {
    name: "Advanced SQL Functions",
    category: "SQL",
    subtopics: ["FLOOR / ABS / MOD / ROUND / CEILING", "CONCAT / LENGTH / SUBSTRING / REPLACE / UPPER / LOWER", "CASE / NULLIF / COALESCE", "DATE / TIME / TIMESTAMP / DATEPART / DATEADD"],
    roles: ["sql"]
  },
  "sql-views-indexes": {
    name: "Views & Indexes",
    category: "SQL",
    subtopics: ["Creating Views", "Modifying Views", "Dropping Views", "Managing Indexes", "Query Optimization"],
    roles: ["sql", "data-engineer"]
  },
  "sql-transactions": {
    name: "Transactions & Security",
    category: "SQL",
    subtopics: ["BEGIN / COMMIT / ROLLBACK / SAVEPOINT", "ACID Properties", "Transaction Isolation Levels", "Data Integrity Constraints", "GRANT and Revoke", "DB Security Best Practices"],
    roles: ["sql", "data-engineer"]
  },
  "sql-advanced": {
    name: "Advanced SQL",
    category: "SQL",
    subtopics: ["Window Functions (ROW_NUMBER / RANK / DENSE_RANK / LEAD / LAG)", "Recursive Queries", "Pivot / Unpivot Operations", "Common Table Expressions (CTEs)", "Dynamic SQL"],
    roles: ["sql", "data-engineer"]
  },
  "sql-performance": {
    name: "Performance & Stored Procedures",
    category: "SQL",
    subtopics: ["Query Analysis Techniques", "Using Indexes", "Optimizing Joins", "Reducing Subqueries", "Selective Projection", "Stored Procedures & Functions"],
    roles: ["sql", "data-engineer"]
  },

  // ── MATHEMATICS & STATISTICS ──
  "mathematics": {
    name: "Mathematics for ML",
    category: "Mathematics & Statistics",
    subtopics: ["Linear Algebra", "Calculus & Mathematical Analysis", "Differential Calculus", "Chain Rule of Derivation", "Gradient, Jacobian, Hessian", "Derivatives & Partial Derivatives", "Scalars, Vectors, Tensors", "Singular Value Decomposition (SVD)", "Matrix Operations", "Eigenvalues & Diagonalization", "Discrete Mathematics"],
    roles: ["ai-data-scientist", "ml-engineer"]
  },
  "statistics": {
    name: "Statistics & Probability",
    category: "Mathematics & Statistics",
    subtopics: ["Statistics & CLT", "Hypothesis Testing", "Probability & Sampling", "AB Testing", "Bayes Theorem", "Descriptive Statistics", "Inferential Statistics", "Types of Distribution", "Random Variables & PDFs", "Ratio Metrics", "Experiment Design"],
    roles: ["ai-data-scientist", "ml-engineer", "data-analyst"]
  },
  "econometrics": {
    name: "Econometrics",
    category: "Mathematics & Statistics",
    subtopics: ["Fundamentals of Econometrics", "Regression", "Time Series", "Fitting Distributions", "ARIMA Model", "Forecasting", "Pre-requisites of Econometrics"],
    roles: ["ai-data-scientist"]
  },

  // ── MACHINE LEARNING ──
  "ml-fundamentals": {
    name: "ML Fundamentals",
    category: "Machine Learning",
    subtopics: ["What is Machine Learning?", "Supervised Learning", "Unsupervised Learning", "Semi-supervised Learning", "Reinforcement Learning", "Self-supervised Learning", "Data Sources (Databases / APIs / IoT)"],
    roles: ["ml-engineer", "ai-data-scientist", "data-analyst", "mlops", "ai-engineer"]
  },
  "data-cleaning": {
    name: "Data Cleaning & Feature Engineering",
    category: "Machine Learning",
    subtopics: ["Preprocessing Techniques", "Data Cleaning", "Feature Engineering", "Feature Selection", "Feature Scaling & Normalization", "Dimensionality Reduction", "Data Formats (CSV / JSON / Parquet / Excel)"],
    roles: ["ml-engineer", "ai-data-scientist", "data-analyst", "data-engineer"]
  },
  "supervised-learning": {
    name: "Supervised Learning",
    category: "Machine Learning",
    subtopics: ["Logistic Regression", "Support Vector Machines (SVM)", "K-Nearest Neighbors (KNN)", "Decision Trees", "Random Forest", "Gradient Boosting Machines", "Linear Regression", "Polynomial Regression", "Lasso / Ridge / ElasticNet"],
    roles: ["ml-engineer", "ai-data-scientist", "data-analyst"]
  },
  "unsupervised-learning": {
    name: "Unsupervised Learning",
    category: "Machine Learning",
    subtopics: ["K-Means Clustering", "Exclusive Clustering", "Overlapping Clustering", "Hierarchical Clustering", "Probabilistic Clustering", "Principal Component Analysis (PCA)", "Autoencoders for Dim. Reduction"],
    roles: ["ml-engineer", "ai-data-scientist", "data-analyst"]
  },
  "reinforcement-learning": {
    name: "Reinforcement Learning",
    category: "Machine Learning",
    subtopics: ["What is Reinforcement Learning?", "Q-Learning", "Deep-Q Networks", "Policy Gradient", "Actor-Critic Methods"],
    roles: ["ml-engineer", "ai-data-scientist"]
  },
  "model-evaluation": {
    name: "Model Evaluation",
    category: "Machine Learning",
    subtopics: ["Accuracy", "Precision & Recall", "F1-Score", "ROC-AUC", "Log Loss", "Confusion Matrix", "K-Fold Cross Validation", "LOOCV", "Model Selection"],
    roles: ["ml-engineer", "ai-data-scientist", "data-analyst"]
  },
  "scikit-learn": {
    name: "Scikit-learn",
    category: "Machine Learning",
    subtopics: ["Data Loading", "Train-Test Split", "Data Preparation", "Model Selection", "Tuning", "Prediction", "Validation Techniques"],
    roles: ["ml-engineer", "ai-data-scientist"]
  },

  // ── DEEP LEARNING ──
  "neural-networks": {
    name: "Neural Network Basics",
    category: "Deep Learning",
    subtopics: ["Perceptron", "Multi-layer Perceptrons (MLP)", "Forward Propagation", "Back Propagation", "Activation Functions", "Loss Functions"],
    roles: ["ml-engineer", "ai-data-scientist", "data-analyst"]
  },
  "cnn": {
    name: "Convolutional Neural Networks",
    category: "Deep Learning",
    subtopics: ["Convolution", "Pooling", "Padding", "Strides", "Image Classification", "Image Segmentation", "Image & Video Recognition", "Recommendation Systems with CNN"],
    roles: ["ml-engineer", "ai-data-scientist"]
  },
  "rnn-lstm": {
    name: "RNNs & LSTMs",
    category: "Deep Learning",
    subtopics: ["RNN", "GRU", "LSTM", "Attention Mechanisms"],
    roles: ["ml-engineer", "ai-data-scientist"]
  },
  "transformers": {
    name: "Transformers",
    category: "Deep Learning",
    subtopics: ["Self-Attention", "Multi-head Attention", "Transformer Architecture", "BERT / GPT Concepts", "Attention is All You Need (Paper)"],
    roles: ["ml-engineer", "ai-data-scientist", "ai-engineer"]
  },
  "generative-models": {
    name: "Generative Models",
    category: "Deep Learning",
    subtopics: ["Generative Adversarial Networks (GANs)", "Autoencoders", "Variational Autoencoders (VAEs)"],
    roles: ["ml-engineer", "ai-data-scientist"]
  },
  "deep-learning-libs": {
    name: "Deep Learning Libraries",
    category: "Deep Learning",
    subtopics: ["TensorFlow", "Keras", "PyTorch", "Scikit-learn (DL context)"],
    roles: ["ml-engineer", "ai-data-scientist", "data-analyst"]
  },
  "nlp": {
    name: "NLP & Explainability",
    category: "Deep Learning",
    subtopics: ["Tokenization", "Lemmatization", "Stemming", "Embeddings (NLP context)", "Attention Models", "Explainable AI"],
    roles: ["ml-engineer", "ai-data-scientist"]
  },

  // ── AI & LLMs ──
  "llm-basics": {
    name: "LLM Fundamentals",
    category: "AI & LLMs",
    subtopics: ["What is an AI Engineer?", "LLMs and How They Work", "Inference", "Training", "AI vs AGI", "Context Window", "Hallucination", "Model Weights / Parameters", "Fine-Tuning vs Prompt Engineering", "RAG Overview", "Agents Overview", "Common Terminology"],
    roles: ["ai-engineer", "prompt-engineering"]
  },
  "llm-models": {
    name: "LLM Models Overview",
    category: "AI & LLMs",
    subtopics: ["OpenAI Models (GPT-4 / o1)", "Anthropic Claude", "Google Gemini", "Azure AI", "AWS SageMaker", "Hugging Face Models", "Mistral AI", "Cohere", "Meta Models (Llama)", "xAI", "Capabilities & Context Length", "Cut-off Dates & Knowledge"],
    roles: ["ai-engineer", "prompt-engineering"]
  },
  "openai-api": {
    name: "OpenAI Platform & API",
    category: "AI & LLMs",
    subtopics: ["Chat Completions API", "Writing Prompts", "Fine-tuning", "Max Tokens / Token Counting", "Pricing Considerations", "OpenAI Playground", "OpenAI Vision API", "DALL-E API", "Whisper API", "OpenAI Embeddings API", "OpenAI Moderation API"],
    roles: ["ai-engineer"]
  },
  "prompt-engineering": {
    name: "Prompting Techniques",
    category: "AI & LLMs",
    subtopics: ["Zero-Shot Prompting", "One-Shot / Few-Shot Prompting", "System Prompting", "Role Prompting", "Contextual Prompting", "Step-back Prompting", "Chain of Thought (CoT)", "Self-Consistency Prompting", "Tree of Thoughts (ToT)", "ReAct Prompting", "Automatic Prompt Engineering", "Structured Outputs"],
    roles: ["ai-engineer", "prompt-engineering"]
  },
  "llm-config": {
    name: "LLM Configuration",
    category: "AI & LLMs",
    subtopics: ["Temperature", "Top-K", "Top-P", "Max Tokens", "Stop Sequences", "Frequency Penalty", "Presence Penalty", "Repetition Penalties", "Sampling Parameters", "Output Control"],
    roles: ["ai-engineer", "prompt-engineering"]
  },
  "ai-safety": {
    name: "AI Safety & Ethics",
    category: "AI & LLMs",
    subtopics: ["Understanding AI Safety Issues", "Prompt Injection Attacks", "Bias and Fairness", "Security & Privacy Concerns", "Adversarial Testing", "Safety Best Practices", "AI Red Teaming", "Constraining Outputs / Inputs"],
    roles: ["ai-engineer", "prompt-engineering"]
  },
  "open-source-ai": {
    name: "Open Source AI",
    category: "AI & LLMs",
    subtopics: ["Open vs Closed Source Models", "Hugging Face Hub", "Hugging Face Tasks", "Finding Open Source Models", "Inference SDK", "Transformers.js", "Ollama", "Ollama Models", "Ollama SDK"],
    roles: ["ai-engineer"]
  },
  "embeddings": {
    name: "Embeddings",
    category: "AI & LLMs",
    subtopics: ["What are Embeddings", "Semantic Search", "Recommendation Systems", "Anomaly Detection", "Data Classification", "Open-Source Embeddings", "Sentence Transformers", "Models on Hugging Face", "OpenAI Embeddings API"],
    roles: ["ai-engineer"]
  },
  "vector-databases": {
    name: "Vector Databases",
    category: "AI & LLMs",
    subtopics: ["Purpose & Functionality", "Chroma", "Pinecone", "Weaviate", "FAISS", "LanceDB", "Qdrant", "Supabase", "MongoDB Atlas", "Indexing Embeddings", "Performing Similarity Search"],
    roles: ["ai-engineer"]
  },
  "rag": {
    name: "RAG Implementation",
    category: "AI & LLMs",
    subtopics: ["RAG Usecases", "RAG vs Fine-tuning", "Chunking", "Embedding", "Retrieval Process", "Generation", "Implementing RAG", "LangChain", "LlamaIndex", "OpenAI Assistant API"],
    roles: ["ai-engineer"]
  },
  "ai-agents": {
    name: "AI Agents",
    category: "AI & LLMs",
    subtopics: ["Agents Usecases", "RAG Alternative", "ReAct Prompting for Agents", "Manual Implementation", "OpenAI Functions / Tools", "Building AI Agents"],
    roles: ["ai-engineer"]
  },
  "multimodal-ai": {
    name: "Multimodal AI",
    category: "AI & LLMs",
    subtopics: ["Image Understanding", "Image Generation", "Video Understanding", "Audio Processing", "Text-to-Speech", "Speech-to-Text", "LangChain for Multimodal", "LlamaIndex for Multimodal"],
    roles: ["ai-engineer"]
  },
  "prompt-reliability": {
    name: "Prompt Reliability & Best Practices",
    category: "AI & LLMs",
    subtopics: ["Prompt Debiasing", "Prompt Ensembling", "LLM Self Evaluation", "Calibrating LLMs", "Prompting Best Practices"],
    roles: ["prompt-engineering"]
  },

  // ── DATA ANALYSIS ──
  "excel": {
    name: "Excel & Spreadsheets",
    category: "Data Analysis",
    subtopics: ["IF & DATEDIF", "VLOOKUP / HLOOKUP", "REPLACE / SUBSTITUTE", "UPPER / LOWER / PROPER", "CONCAT / TRIM", "AVERAGE / COUNT / SUM / MIN / MAX", "Charting in Excel", "Pivot Tables"],
    roles: ["data-analyst"]
  },
  "eda": {
    name: "Exploratory Data Analysis",
    category: "Data Analysis",
    subtopics: ["Data Understanding & Analysis", "Descriptive Analysis (Mean / Median / Mode)", "Variance, Std Dev, Skewness, Kurtosis", "Central Tendency & Dispersion", "EDA with Python & Pandas", "EDA with Seaborn", "Visualizing Distributions"],
    roles: ["data-analyst", "ai-data-scientist", "ml-engineer"]
  },
  "data-visualization": {
    name: "Data Visualization",
    category: "Data Analysis",
    subtopics: ["Tableau", "Power BI", "Matplotlib", "Seaborn", "ggplot2", "Bar Charts", "Line Charts", "Scatter Plots", "Histograms", "Heatmaps", "Pie Charts", "Funnel Charts", "Stacked Charts"],
    roles: ["data-analyst", "ai-data-scientist"]
  },
  "statistical-analysis": {
    name: "Statistical Analysis",
    category: "Data Analysis",
    subtopics: ["Hypothesis Testing", "Correlation Analysis", "Regression Analysis", "Visualizing Distributions", "Generating Statistics"],
    roles: ["data-analyst", "ai-data-scientist"]
  },
  "data-collection": {
    name: "Data Collection",
    category: "Data Analysis",
    subtopics: ["Databases", "CSV Files", "APIs", "Web Scraping", "Data Storage Solutions"],
    roles: ["data-analyst", "data-engineer"]
  },

  // ── DATA ENGINEERING ──
  "db-fundamentals": {
    name: "Database Fundamentals",
    category: "Data Engineering",
    subtopics: ["Data Normalization", "Data Modelling Techniques", "CAP Theorem", "OLTP vs OLAP", "Slowly Changing Dimension (SCD)", "Horizontal vs Vertical Scaling", "Star vs Snowflake Schema"],
    roles: ["data-engineer"]
  },
  "relational-dbs": {
    name: "Relational Databases",
    category: "Data Engineering",
    subtopics: ["MySQL", "PostgreSQL", "MariaDB", "Aurora DB", "Oracle", "MS SQL", "Transactions", "Indexing"],
    roles: ["data-engineer"]
  },
  "nosql-dbs": {
    name: "NoSQL Databases",
    category: "Data Engineering",
    subtopics: ["MongoDB (Document)", "ElasticSearch", "CosmosDB", "CouchDB", "Cassandra (Column)", "BigTable", "HBase", "Neo4j (Graph)", "Neptune", "Redis (Key-Value)", "Memcached", "DynamoDB"],
    roles: ["data-engineer"]
  },
  "data-warehousing": {
    name: "Data Warehousing",
    category: "Data Engineering",
    subtopics: ["What is a Data Warehouse", "Warehousing Architectures", "Google BigQuery", "Snowflake", "Amazon Redshift", "Data Mart", "Data Lake", "Databricks Delta Lake", "Data Mesh", "Data Fabric", "Serverless Options"],
    roles: ["data-engineer", "mlops"]
  },
  "data-pipelines": {
    name: "Data Pipelines & ETL",
    category: "Data Engineering",
    subtopics: ["ETL Process (Extract / Transform / Load)", "Batch / Streaming / Hybrid / Realtime Ingestion", "Apache Airflow", "dbt", "Luigi", "Prefect", "Cluster Computing Basics", "Distributed File Systems", "Job Scheduling"],
    roles: ["data-engineer", "mlops"]
  },
  "big-data": {
    name: "Big Data Tools",
    category: "Data Engineering",
    subtopics: ["HDFS", "MapReduce", "YARN", "Hadoop Ecosystem", "Apache Spark", "Apache Kafka", "Flink"],
    roles: ["data-engineer", "mlops", "data-analyst"]
  },
  "messaging-systems": {
    name: "Messaging Systems",
    category: "Data Engineering",
    subtopics: ["Async vs Sync Communication", "Messages vs Streams", "Apache Kafka", "RabbitMQ", "AWS SQS", "AWS SNS", "Best Practices"],
    roles: ["data-engineer"]
  },
  "data-governance": {
    name: "Data Governance & Privacy",
    category: "Data Engineering",
    subtopics: ["Data Quality", "Data Lineage", "Metadata Management", "Data Interoperability", "GDPR", "ECPA", "EU AI Act", "Authentication vs Authorization", "Encryption", "Tokenization", "Data Masking"],
    roles: ["data-engineer"]
  },

  // ── PROGRAMMING FUNDAMENTALS (from MLOps + Data Engineer PDFs) ──
  "linux-bash": {
    name: "Linux & Bash Scripting",
    category: "Programming Fundamentals",
    subtopics: ["Linux Basics", "File System & Permissions", "Shell Scripting (Bash)", "Environment Variables", "Process Management", "Cron Jobs", "SSH & Networking Commands"],
    roles: ["data-engineer", "mlops"]
  },
  "go-lang": {
    name: "Go (Golang)",
    category: "Programming Fundamentals",
    subtopics: ["Go Basics", "Goroutines & Channels", "Go Modules", "Error Handling in Go", "Building CLI Tools in Go"],
    roles: ["mlops"]
  },
  "networking-distributed": {
    name: "Networking & Distributed Systems",
    category: "Programming Fundamentals",
    subtopics: ["Networking Fundamentals", "TCP/IP", "HTTP/HTTPS", "DNS", "Load Balancing", "Distributed Systems Basics", "CAP Theorem (Networking)", "Fault Tolerance"],
    roles: ["data-engineer"]
  },
  "r-programming": {
    name: "R Programming",
    category: "Programming Fundamentals",
    subtopics: ["R Basics", "Data Manipulation (dplyr)", "Data Visualization (ggplot2)", "Statistical Analysis in R", "R Markdown"],
    roles: ["data-analyst", "ai-data-scientist"]
  },
  "ai-dev-tools": {
    name: "AI Development Tools",
    category: "Programming Fundamentals",
    subtopics: ["AI Code Editors (Cursor, GitHub Copilot)", "Code Completion Tools", "LLM-powered Dev Workflows"],
    roles: ["ai-engineer"]
  },

  // ── DATA SERVING & BI (from Data Engineer PDF) ──
  "bi-tools": {
    name: "Business Intelligence & Reverse ETL",
    category: "Data Engineering",
    subtopics: ["Microsoft Power BI", "Tableau", "Looker", "Streamlit", "Reverse ETL Concepts", "ETL vs Reverse ETL", "Census", "Hightouch", "Segment"],
    roles: ["data-engineer", "data-analyst"]
  },

  // ── MLOps & INFRASTRUCTURE ──
  "git-vcs": {
    name: "Git & Version Control",
    category: "MLOps & Infrastructure",
    subtopics: ["Git", "GitHub", "Version Control Systems", "Version Control in ML"],
    roles: ["data-engineer", "mlops", "python"]
  },
  "cloud-computing": {
    name: "Cloud Computing",
    category: "MLOps & Infrastructure",
    subtopics: ["AWS (EC2 / S3 / RDS / Glue / SageMaker / EKS)", "Azure (VMs / Blob Storage / SQL Database / Data Factory)", "Google Cloud (Compute Engine / Cloud Storage / Cloud SQL / Dataflow / GKE)", "Cloud-native ML Services", "Cloud Architectures"],
    roles: ["data-engineer", "mlops"]
  },
  "containerization": {
    name: "Containers & Orchestration",
    category: "MLOps & Infrastructure",
    subtopics: ["Docker", "Kubernetes", "Google Cloud GKE", "AWS EKS"],
    roles: ["data-engineer", "mlops"]
  },
  "ci-cd": {
    name: "CI/CD",
    category: "MLOps & Infrastructure",
    subtopics: ["GitHub Actions", "GitLab CI", "Circle CI", "ArgoCD", "CI/CD Principles", "Orchestration"],
    roles: ["data-engineer", "mlops"]
  },
  "infrastructure-as-code": {
    name: "Infrastructure as Code",
    category: "MLOps & Infrastructure",
    subtopics: ["Declarative vs Imperative", "Idempotency", "Reusability", "Terraform", "OpenTofu", "AWS CDK", "Google Deployment Manager"],
    roles: ["data-engineer", "mlops"]
  },
  "mlops-components": {
    name: "MLOps Components",
    category: "MLOps & Infrastructure",
    subtopics: ["Experiment Tracking & Model Registry", "Data Lineage & Feature Stores", "Model Training & Serving", "Monitoring & Observability", "MLOps Principles", "CI/CD for ML", "Orchestration"],
    roles: ["mlops", "ai-data-scientist"]
  },
  "monitoring": {
    name: "Monitoring & Observability",
    category: "MLOps & Infrastructure",
    subtopics: ["Prometheus", "Datadog", "Sentry", "New Relic", "Monitoring Principles"],
    roles: ["data-engineer", "mlops"]
  }
};

export const ROLES = {
  "ai-engineer": {
    name: "AI Engineer",
    icon: "🤖",
    color: "#6366f1",
    skills: ["python-basics", "ai-dev-tools", "llm-basics", "llm-models", "openai-api", "prompt-engineering", "llm-config", "ai-safety", "open-source-ai", "embeddings", "vector-databases", "rag", "ai-agents", "multimodal-ai", "transformers", "ml-fundamentals"]
  },
  "ai-data-scientist": {
    name: "AI & Data Scientist",
    icon: "🧬",
    color: "#ec4899",
    skills: ["mathematics", "statistics", "econometrics", "python-basics", "python-ds-algo", "python-essential-libs", "r-programming", "sql-basics", "eda", "data-cleaning", "ml-fundamentals", "supervised-learning", "unsupervised-learning", "reinforcement-learning", "model-evaluation", "scikit-learn", "neural-networks", "cnn", "rnn-lstm", "transformers", "generative-models", "deep-learning-libs", "nlp", "mlops-components"]
  },
  "data-analyst": {
    name: "Data Analyst",
    icon: "📊",
    color: "#f59e0b",
    skills: ["excel", "python-basics", "python-essential-libs", "r-programming", "sql-basics", "sql-joins", "data-collection", "data-cleaning", "eda", "data-visualization", "statistical-analysis", "statistics", "bi-tools", "ml-fundamentals", "supervised-learning", "unsupervised-learning", "model-evaluation", "neural-networks", "deep-learning-libs", "big-data"]
  },
  "data-engineer": {
    name: "Data Engineer",
    icon: "⚙️",
    color: "#10b981",
    skills: ["python-basics", "python-ds-algo", "python-oop", "linux-bash", "networking-distributed", "sql-basics", "sql-ddl-dml", "sql-joins", "sql-views-indexes", "sql-transactions", "sql-advanced", "sql-performance", "git-vcs", "db-fundamentals", "relational-dbs", "nosql-dbs", "data-warehousing", "data-pipelines", "big-data", "messaging-systems", "bi-tools", "cloud-computing", "containerization", "ci-cd", "infrastructure-as-code", "data-governance", "data-collection", "data-cleaning"]
  },
  "ml-engineer": {
    name: "ML Engineer",
    icon: "🧠",
    color: "#3b82f6",
    skills: ["python-basics", "python-oop", "python-ds-algo", "python-essential-libs", "mathematics", "statistics", "data-cleaning", "ml-fundamentals", "supervised-learning", "unsupervised-learning", "reinforcement-learning", "model-evaluation", "scikit-learn", "neural-networks", "cnn", "rnn-lstm", "transformers", "generative-models", "deep-learning-libs", "nlp", "eda"]
  },
  "mlops": {
    name: "MLOps",
    icon: "🔄",
    color: "#8b5cf6",
    skills: ["python-basics", "linux-bash", "go-lang", "git-vcs", "cloud-computing", "containerization", "ml-fundamentals", "data-pipelines", "data-warehousing", "big-data", "mlops-components", "ci-cd", "infrastructure-as-code", "monitoring"]
  },
  "prompt-engineering": {
    name: "Prompt Engineer",
    icon: "✍️",
    color: "#f97316",
    skills: ["llm-basics", "llm-models", "llm-config", "prompt-engineering", "ai-safety", "prompt-reliability"]
  },
  "python": {
    name: "Python",
    icon: "🐍",
    color: "#eab308",
    skills: ["python-basics", "python-oop", "python-advanced", "python-ds-algo", "python-packages", "python-environments", "python-static-typing", "python-testing", "python-frameworks", "python-concurrency", "python-code-quality", "git-vcs"]
  },
  "sql": {
    name: "SQL",
    icon: "🗄️",
    color: "#06b6d4",
    skills: ["sql-basics", "sql-ddl-dml", "sql-joins", "sql-subqueries", "sql-advanced-functions", "sql-views-indexes", "sql-transactions", "sql-advanced", "sql-performance"]
  }
};

export const CATEGORIES = [
  "Python",
  "SQL",
  "Programming Fundamentals",
  "Mathematics & Statistics",
  "Machine Learning",
  "Deep Learning",
  "AI & LLMs",
  "Data Analysis",
  "Data Engineering",
  "MLOps & Infrastructure"
];
