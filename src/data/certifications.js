// level: "Foundational" | "Associate" | "Professional" | "Expert" | "Specialization"
// cost: "free" | "paid"
// difficulty: 1 (beginner) | 2 (intermediate) | 3 (advanced)

export const CERTIFICATIONS = {

  // ── GOOGLE CLOUD ──
  "gcp-ml-engineer": {
    name: "Professional Machine Learning Engineer",
    provider: "Google Cloud", badge: "GCP",
    level: "Professional", difficulty: 3, cost: "paid",
    roles: ["ai-engineer", "ml-engineer", "mlops"]
  },
  "gcp-data-engineer": {
    name: "Professional Data Engineer",
    provider: "Google Cloud", badge: "GCP",
    level: "Professional", difficulty: 3, cost: "paid",
    roles: ["data-engineer", "mlops"]
  },

  // ── AWS ──
  "aws-ml-specialty": {
    name: "Certified Machine Learning Specialty (MLS-C01)",
    provider: "Amazon Web Services", badge: "AWS",
    level: "Specialty", difficulty: 3, cost: "paid",
    roles: ["ai-engineer", "ml-engineer", "mlops"]
  },
  "aws-data-engineer": {
    name: "Certified Data Engineer Associate (DEA-C01)",
    provider: "Amazon Web Services", badge: "AWS",
    level: "Associate", difficulty: 2, cost: "paid",
    roles: ["data-engineer", "mlops"]
  },
  "aws-solutions-architect": {
    name: "Certified Solutions Architect Associate (SAA-C03)",
    provider: "Amazon Web Services", badge: "AWS",
    level: "Associate", difficulty: 2, cost: "paid",
    roles: ["data-engineer", "mlops"]
  },

  // ── MICROSOFT AZURE ──
  "ai-102": {
    name: "Azure AI Engineer Associate (AI-102)",
    provider: "Microsoft Azure", badge: "Azure",
    level: "Associate", difficulty: 2, cost: "paid",
    roles: ["ai-engineer", "ml-engineer"]
  },
  "dp-100": {
    name: "Azure Data Scientist Associate (DP-100)",
    provider: "Microsoft Azure", badge: "Azure",
    level: "Associate", difficulty: 2, cost: "paid",
    roles: ["ai-data-scientist", "ml-engineer"]
  },
  "dp-203": {
    name: "Azure Data Engineer Associate (DP-203)",
    provider: "Microsoft Azure", badge: "Azure",
    level: "Associate", difficulty: 2, cost: "paid",
    roles: ["data-engineer"]
  },
  "pl-300": {
    name: "Power BI Data Analyst (PL-300)",
    provider: "Microsoft Azure", badge: "Azure",
    level: "Associate", difficulty: 2, cost: "paid",
    roles: ["data-analyst"]
  },

  // ── DATABRICKS ──
  "databricks-de-associate": {
    name: "Certified Data Engineer Associate",
    provider: "Databricks", badge: "Databricks",
    level: "Associate", difficulty: 2, cost: "paid",
    roles: ["data-engineer", "mlops"]
  },
  "databricks-ml-associate": {
    name: "Certified Machine Learning Associate",
    provider: "Databricks", badge: "Databricks",
    level: "Associate", difficulty: 2, cost: "paid",
    roles: ["ml-engineer", "mlops"]
  },
  "databricks-spark": {
    name: "Certified Developer for Apache Spark",
    provider: "Databricks", badge: "Databricks",
    level: "Associate", difficulty: 2, cost: "paid",
    roles: ["data-engineer"]
  },

  // ── SNOWFLAKE ──
  "snowpro-core": {
    name: "SnowPro Core Certification",
    provider: "Snowflake", badge: "Snowflake",
    level: "Associate", difficulty: 2, cost: "paid",
    roles: ["data-engineer", "data-analyst"]
  },
  "snowpro-advanced-de": {
    name: "SnowPro Advanced: Data Engineer",
    provider: "Snowflake", badge: "Snowflake",
    level: "Professional", difficulty: 3, cost: "paid",
    roles: ["data-engineer"]
  },

  // ── DEEPLEARNING.AI ──
  "dlai-ml-spec": {
    name: "Machine Learning Specialization",
    provider: "DeepLearning.AI / Coursera", badge: "DLAI",
    level: "Specialization", difficulty: 2, cost: "paid",
    roles: ["ml-engineer", "ai-data-scientist"]
  },
  "dlai-dl-spec": {
    name: "Deep Learning Specialization",
    provider: "DeepLearning.AI / Coursera", badge: "DLAI",
    level: "Specialization", difficulty: 3, cost: "paid",
    roles: ["ml-engineer", "ai-data-scientist"]
  },
  "dlai-mlops-spec": {
    name: "MLOps Specialization",
    provider: "DeepLearning.AI / Coursera", badge: "DLAI",
    level: "Specialization", difficulty: 3, cost: "paid",
    roles: ["mlops", "ml-engineer"]
  },

  // ── GOOGLE ──
  "tf-developer": {
    name: "TensorFlow Developer Certificate",
    provider: "Google", badge: "Google",
    level: "Associate", difficulty: 2, cost: "paid",
    roles: ["ml-engineer", "ai-data-scientist"]
  },

  // ── CONFLUENT / KAFKA ──
  "confluent-kafka-dev": {
    name: "Certified Developer for Apache Kafka (CCDAK)",
    provider: "Confluent", badge: "Confluent",
    level: "Associate", difficulty: 2, cost: "paid",
    roles: ["data-engineer", "mlops"]
  },

  // ── KUBERNETES ──
  "cka": {
    name: "Certified Kubernetes Administrator (CKA)",
    provider: "Linux Foundation / CNCF", badge: "K8s",
    level: "Professional", difficulty: 3, cost: "paid",
    roles: ["mlops", "data-engineer"]
  },
  "ckad": {
    name: "Certified Kubernetes Application Developer (CKAD)",
    provider: "Linux Foundation / CNCF", badge: "K8s",
    level: "Associate", difficulty: 2, cost: "paid",
    roles: ["mlops"]
  },

  // ── HASHICORP ──
  "terraform-associate": {
    name: "Terraform Associate (003)",
    provider: "HashiCorp", badge: "HashiCorp",
    level: "Associate", difficulty: 2, cost: "paid",
    roles: ["mlops", "data-engineer"]
  },

  // ── dbt ──
  "dbt-analytics-eng": {
    name: "Analytics Engineering Certification",
    provider: "dbt Labs", badge: "dbt",
    level: "Associate", difficulty: 2, cost: "paid",
    roles: ["data-engineer", "data-analyst"]
  },

  // ── TABLEAU ──
  "tableau-analyst": {
    name: "Tableau Certified Data Analyst",
    provider: "Tableau / Salesforce", badge: "Tableau",
    level: "Associate", difficulty: 2, cost: "paid",
    roles: ["data-analyst"]
  },

  // ── NVIDIA ──
  "nvidia-dli-dl": {
    name: "Fundamentals of Deep Learning",
    provider: "NVIDIA Deep Learning Institute", badge: "NVIDIA",
    level: "Foundational", difficulty: 2, cost: "paid",
    roles: ["ml-engineer", "ai-data-scientist"]
  },
};

export const CERT_STORAGE_KEY = "roadmap-certs";

export function loadCerts() {
  try {
    const raw = localStorage.getItem(CERT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

export function saveCerts(certs) {
  localStorage.setItem(CERT_STORAGE_KEY, JSON.stringify(certs));
}
