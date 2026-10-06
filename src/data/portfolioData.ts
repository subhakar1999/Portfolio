export interface Project {
  id: string;
  title: string;
  category: 'Cloud Security' | 'DevSecOps' | 'AI Security' | 'Infrastructure' | 'DevOps';
  company: string;
  period: string;
  description: string;
  highlights: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  featured?: boolean;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  project: string;
  environment: string[];
  summary: string;
  responsibilities: string[];
  achievements?: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: number; // percentage 1-100
    experience: string;
    badge?: string;
  }[];
}

export interface Certification {
  name: string;
  issuer: string;
  badgeCode: string;
  issueDate: string;
  icon: string;
  color: string;
  credentialId?: string;
  skillsVerified: string[];
}

export interface Award {
  title: string;
  issuer: string;
  description: string;
  icon: string;
  highlight?: string;
}

export const PERSONAL_INFO = {
  name: "Bharath Sai Subhakar K",
  title: "Senior Azure Security & DevSecOps Engineer",
  roles: [
    "Senior Azure Security Engineer",
    "DevSecOps Architect",
    "Cloud Infrastructure Engineer",
    "AI Security Operations Specialist"
  ],
  status: "Senior Software Engineer @ Volkswagen Group Digital Solutions",
  statusBadge: "Available for High-Impact Roles",
  location: "India",
  email: "bharathsaisubhakark@gmail.com",
  phone: "+91-9110560924",
  linkedin: "https://www.linkedin.com/in/bharathsai-subhakar-devops",
  github: "https://github.com",
  summary: "Results-driven Azure Security, DevSecOps, and Cloud Engineer with 6+ years of experience engineering secure cloud architectures, multi-stage CI/CD automation, and autonomous AI security operations. Currently driving cloud security governance, Microsoft Sentinel SIEM/SOAR automation, and Defender for Cloud posture management at Volkswagen Group Digital Solutions. Proven track record of architecting shift-left security pipelines (SAST/DAST/SCA), building custom LLM security agents on Azure AI endpoints, and managing production AKS clusters.",
  stats: [
    { label: "Years Experience", value: "6+", change: "Continuous Growth" },
    { label: "Apps Migrated to Cloud", value: "70+", change: "Zero-Downtime" },
    { label: "Security Compliance", value: "99.8%", change: "Audit-Ready" },
    { label: "Awards & Honors", value: "5x", change: "Quality & Impact" }
  ]
};

export const CERTIFICATIONS: Certification[] = [
  {
    name: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    badgeCode: "003",
    issueDate: "Verified",
    icon: "Boxes",
    color: "from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30",
    skillsVerified: [
      "Infrastructure as Code (IaC)",
      "Terraform Cloud & Modules",
      "State Management & Security",
      "Provider Governance"
    ]
  },
  {
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    badgeCode: "AZ-900",
    issueDate: "Certified",
    icon: "ShieldCheck",
    color: "from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30",
    skillsVerified: [
      "Azure Cloud Architecture",
      "Identity & Entra ID (Azure AD)",
      "Governance & Azure Policy",
      "Cloud Security Standards"
    ]
  },
  {
    name: "Microsoft Certified: Azure Data Fundamentals",
    issuer: "Microsoft",
    badgeCode: "DP-900",
    issueDate: "Certified",
    icon: "Database",
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
    skillsVerified: [
      "Relational & NoSQL Storage",
      "Log Analytics & Telemetry",
      "Data Security & Encryption",
      "Analytical Workloads"
    ]
  }
];

export const AWARDS: Award[] = [
  {
    title: "Best Performer (Quality) of the Quarter",
    issuer: "Client Recognition",
    description: "Awarded by the enterprise client for exceptional deployment accuracy, zero-defect release executions, and high system reliability.",
    icon: "Trophy",
    highlight: "Zero-Defect Deployments"
  },
  {
    title: "IMPACT Award (3x Recipient)",
    issuer: "Enterprise Organization",
    description: "Honored three times for extreme dedication, technical leadership, and driving major milestone deliveries across cloud migration and DevSecOps gates.",
    icon: "Flame",
    highlight: "3x Consecutive Winner"
  },
  {
    title: "SPOT Award",
    issuer: "Engineering Leadership",
    description: "Recognized for exemplary peer collaboration, proactive incident triage, and cultivating a culture of technical excellence and appreciation.",
    icon: "Award",
    highlight: "Excellence & Teamwork"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Volkswagen Group Digital Solutions",
    role: "Senior Software Engineer / Azure Security Engineer",
    location: "India",
    period: "July 2024 – Present",
    project: "Azure Foundation, Cloud Security & AI-Driven Security Operations",
    environment: [
      "Microsoft Azure",
      "Azure AI Services",
      "Microsoft Security Copilot",
      "Azure Kubernetes Service (AKS)",
      "Terraform",
      "Microsoft Sentinel",
      "Microsoft Defender for Cloud",
      "Azure Logic Apps",
      "Azure Pipelines",
      "Log Analytics"
    ],
    summary: "Leading Azure Cloud Security and DevSecOps governance across enterprise subscriptions within the Azure Foundation landing zone. Spearheading AI-driven autonomous security triage and SOAR automation.",
    responsibilities: [
      "Lead enterprise Azure Cloud Security posture management, compliance auditing, and DevSecOps governance across multi-subscription landing zones.",
      "Engineered custom LLM-powered AI security analyst agents utilizing Azure AI endpoints and Python to autonomously triage, summarize, and prioritize complex cloud security misconfigurations and threat signals.",
      "Piloted and evaluated Microsoft Security Copilot within non-production environments to accelerate incident investigation workflows, automate KQL query authoring, and generate executive incident summaries.",
      "Established automated DevSecOps governance gates within Azure Pipelines using Terraform validation and Azure Policy-as-Code to prevent non-compliant infrastructure deployments.",
      "Architected and managed production Azure Kubernetes Service (AKS) clusters with Managed Cluster Services, implementing container hardening, network policies, and vulnerability scanning.",
      "Monitored and triaged high-priority cloud security incidents using Microsoft Sentinel and Microsoft Defender for Cloud, developing custom analytic rules and threat hunting queries.",
      "Built automated playbooks using Azure Logic Apps to remediate recurring security drifts, auto-isolate compromised assets, and trigger real-time incident alerts."
    ],
    achievements: [
      "Reduced threat triage response times by 65% by implementing custom Azure AI security agent workflows.",
      "Achieved 100% Policy-as-Code compliance gating on all landing zone Terraform infrastructure changes."
    ]
  },
  {
    company: "Carelon Global Solutions",
    role: "Associate Software Engineer",
    location: "India",
    period: "January 2022 – June 2024",
    project: "Olympus – AWS Landing Zone, Cloud Migration & Enterprise DevSecOps",
    environment: [
      "AWS",
      "Microsoft Azure",
      "DevSecOps",
      "Snyk",
      "Checkmarx",
      "SonarQube",
      "OCP Pipelines",
      "Argo CD",
      "Argo Workflows",
      "Python / Boto3",
      "Terraform Cloud",
      "Bitbucket",
      "Bamboo"
    ],
    summary: "Drove large-scale cloud modernization, migrating 70 enterprise applications to AWS Landing Zone architectures while enforcing shift-left SAST, DAST, SCA security gates in CI/CD pipelines.",
    responsibilities: [
      "Implemented end-to-end DevSecOps practices across enterprise CI/CD pipelines by integrating Snyk, Checkmarx, and SonarQube for automated SAST, SCA, and dependency vulnerability scanning.",
      "Defined and enforced strict build-breaking quality gates, preventing code with critical CVEs or hardcoded secrets from reaching staging and production environments.",
      "Successfully migrated 70 enterprise applications from legacy environments to standardized AWS Landing Zone accounts with baseline Service Control Policies (SCPs).",
      "Designed and executed continuous delivery workflows leveraging Argo CD and OCP Pipelines, generating compliant, hardened container images stored in Quay registries.",
      "Contributed to the development of an automated Azure Platform vending module enabling application development squads to self-serve infrastructure through Terraform Cloud.",
      "Automated end-to-end AWS and Azure cloud resource provisioning using Terraform and Python (Boto3) scripts, S3 data replication, and least-privilege IAM boundary controls.",
      "Built and optimized Bamboo CI/CD pipelines integrated with Bitbucket to support reliable, zero-downtime release deployments."
    ],
    achievements: [
      "Migrated 70+ mission-critical workloads to cloud landing zones with zero data loss and minimal downtime.",
      "Eliminated 90%+ high-severity CVEs before production deployment via automated CI quality gates."
    ]
  },
  {
    company: "SYSBIG TECHNOLOGIES",
    role: "Junior Software Engineer",
    location: "India",
    period: "November 2020 – January 2022",
    project: "Dick's Sporting Goods (DSG) Cloud Modernization",
    environment: [
      "Azure DevOps",
      "Azure Pipelines",
      "Azure Repos",
      "Git",
      ".NET Core",
      "ASP.NET",
      "C#",
      "IIS 8.5/10",
      "MSBuild",
      "dotnet CLI",
      "PowerShell",
      "Microsoft Azure"
    ],
    summary: "Managed end-to-end build, release engineering, and environment administration for high-traffic .NET / ASP.NET e-commerce workloads across multi-tier Azure environments.",
    responsibilities: [
      "Architected, configured, and maintained multi-stage Azure DevOps build and release pipelines for enterprise .NET Core and .NET Framework (ASP.NET) web applications across Dev, QA, Staging, and Production environments.",
      "Automated .NET build compilation, dependency restoration, and artifact packaging utilizing MSBuild, dotnet CLI, and private NuGet feeds within Azure Artifacts.",
      "Administered and hardened Internet Information Services (IIS 8.5/10) servers hosted on Azure Windows VMs; automated application pool configurations, virtual directory creation, and SSL certificate bindings.",
      "Automated XML and JSON configuration transformations (web.config and appsettings.json) across deployment environments, injecting credentials securely via Azure Key Vault pipeline integrations.",
      "Embedded SonarQube code quality scans and automated unit testing (MSTest/NUnit) into .NET build pipelines to validate code quality and enforce security benchmarks prior to release approvals.",
      "Developed modular PowerShell automation scripts for automated IIS website lifecycle management (Stop/Start/Recycle), log archival, and post-deployment sanity checks.",
      "Configured Azure Active Directory RBAC roles, managed user access controls, and enforced pull request validation policies and branch protections in Azure Repos."
    ],
    achievements: [
      "Automated IIS configuration transformations and deployments, reducing manual release cycle time by 80%.",
      "Honored as Best Performer (Quality) of the Quarter by the client for impeccable deployment accuracy."
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Cloud & Platform Security",
    iconName: "Shield",
    description: "Enterprise posture management, cloud threat response, identity governance and SIEM/SOAR orchestration.",
    skills: [
      { name: "Azure Cloud Security", level: 95, experience: "6+ yrs", badge: "Expert" },
      { name: "Microsoft Sentinel (SIEM/SOAR)", level: 92, experience: "4+ yrs", badge: "Core" },
      { name: "Defender for Cloud & DevOps", level: 90, experience: "4+ yrs", badge: "Core" },
      { name: "Azure Policy as Code", level: 92, experience: "5+ yrs", badge: "Expert" },
      { name: "IAM & Entra ID (Azure AD)", level: 94, experience: "6+ yrs", badge: "Expert" },
      { name: "Security Copilot & AI Ops", level: 88, experience: "2+ yrs", badge: "Cutting-Edge" }
    ]
  },
  {
    title: "DevSecOps & Code Quality",
    iconName: "Code2",
    description: "Shift-left automated vulnerability scanning, secrets detection, and CI/CD quality gating.",
    skills: [
      { name: "Snyk & Checkmarx (SAST/SCA)", level: 92, experience: "4+ yrs", badge: "Expert" },
      { name: "SonarQube Quality Gates", level: 95, experience: "5+ yrs", badge: "Expert" },
      { name: "Trivy & Container Hardening", level: 90, experience: "3+ yrs", badge: "Core" },
      { name: "GitGuardian Secrets Scanning", level: 88, experience: "3+ yrs", badge: "Core" },
      { name: "Azure Key Vault Integrations", level: 95, experience: "6+ yrs", badge: "Expert" }
    ]
  },
  {
    title: "CI/CD & DevOps Automation",
    iconName: "GitMerge",
    description: "Multi-stage pipeline engineering, continuous delivery, gitops workflows and artifact packaging.",
    skills: [
      { name: "Azure DevOps & Pipelines (YAML)", level: 96, experience: "6+ yrs", badge: "Master" },
      { name: "Argo CD & Argo Workflows", level: 88, experience: "3+ yrs", badge: "GitOps" },
      { name: "GitHub Actions & Bamboo", level: 90, experience: "4+ yrs", badge: "Core" },
      { name: "Jenkins & OCP Pipelines", level: 88, experience: "4+ yrs", badge: "Core" },
      { name: "Release Management & Versioning", level: 94, experience: "6+ yrs", badge: "Expert" }
    ]
  },
  {
    title: "Infrastructure as Code & Cloud",
    iconName: "Cloud",
    description: "Automated landing zones, multi-cloud account vending, and immutable infrastructure orchestration.",
    skills: [
      { name: "Terraform & Terraform Cloud", level: 94, experience: "5+ yrs", badge: "Certified" },
      { name: "ARM Templates & Bicep", level: 90, experience: "5+ yrs", badge: "Core" },
      { name: "AWS CloudFormation & Landing Zone", level: 88, experience: "3+ yrs", badge: "Core" },
      { name: "Azure Kubernetes Service (AKS)", level: 92, experience: "4+ yrs", badge: "Core" },
      { name: "Docker & Red Hat OpenShift (OCP)", level: 90, experience: "4+ yrs", badge: "Core" }
    ]
  },
  {
    title: ".NET Ecosystem & Web Hosting",
    iconName: "Server",
    description: "Enterprise .NET compilation, IIS server administration, SSL bindings, and app transformations.",
    skills: [
      { name: "IIS 8.5/10 Administration", level: 95, experience: "6+ yrs", badge: "Expert" },
      { name: ".NET Core & ASP.NET Build Automation", level: 92, experience: "5+ yrs", badge: "Core" },
      { name: "MSBuild & dotnet CLI", level: 92, experience: "5+ yrs", badge: "Core" },
      { name: "web.config & appsettings Transforms", level: 96, experience: "6+ yrs", badge: "Master" },
      { name: "PowerShell & Python (Boto3)", level: 94, experience: "6+ yrs", badge: "Expert" }
    ]
  }
];

export const BENTO_PROJECTS: Project[] = [
  {
    id: "ai-sec-ops",
    title: "Autonomous AI Security Operations Agent",
    category: "AI Security",
    company: "Volkswagen Group Digital Solutions",
    period: "2024 - Present",
    description: "Engineered autonomous LLM security agents utilizing Azure AI endpoints, Python, and Microsoft Sentinel KQL to autonomously triage cloud misconfigurations, summarize threat alerts, and trigger Logic Apps SOAR workflows.",
    highlights: [
      "Custom LLM prompts designed to cross-reference MITRE ATT&CK tactics with Azure Defender alerts",
      "Automated KQL hunting query generation from natural language incident descriptions",
      "Zero-touch remediation playbooks for recurring IAM drifts and storage public exposure"
    ],
    techStack: ["Azure AI Services", "Microsoft Sentinel", "Security Copilot", "Python", "Azure Logic Apps", "KQL"],
    metrics: [
      { label: "Triage Acceleration", value: "65%" },
      { label: "Alert Noise Cut", value: "80%" },
      { label: "Auto-Remediation", value: "100%" }
    ],
    featured: true
  },
  {
    id: "shift-left-pipeline",
    title: "Enterprise Shift-Left DevSecOps Gate System",
    category: "DevSecOps",
    company: "Carelon Global Solutions",
    period: "2022 - 2024",
    description: "Designed and implemented end-to-end security gating in enterprise CI/CD pipelines using Snyk, Checkmarx, SonarQube, and Trivy, with strict build-breaking quality gates preventing high CVEs and hardcoded secrets from reaching production.",
    highlights: [
      "Automated SAST, DAST, SCA and secrets scanning embedded at commit and pull request stage",
      "Hardened OCP & Argo CD deployment pipelines with Quay image signing and vulnerability verification",
      "Self-service compliance dashboards providing instant visibility for 30+ engineering squads"
    ],
    techStack: ["Azure DevOps", "Snyk", "Checkmarx", "SonarQube", "Argo CD", "Trivy", "Quay"],
    metrics: [
      { label: "Workloads Secured", value: "70+" },
      { label: "Critical CVEs Blocked", value: "95%" },
      { label: "Build Gate Speed", value: "<3m" }
    ],
    featured: true
  },
  {
    id: "landing-zone-iac",
    title: "Multi-Account AWS & Azure Landing Zone Vending",
    category: "Infrastructure",
    company: "Carelon & Volkswagen",
    period: "2022 - Present",
    description: "Architected standardized, secure-by-default cloud landing zones using Terraform Cloud, AWS Service Control Policies (SCPs), and Azure Policy-as-Code modules for automated, compliant cloud subscription vending.",
    highlights: [
      "Account vending machine module delivering fully compliant cloud subscriptions in under 15 minutes",
      "Centralized log aggregation to Microsoft Sentinel and AWS CloudWatch with least-privilege IAM boundaries",
      "Automated disaster recovery testing using Azure Site Recovery vaults"
    ],
    techStack: ["Terraform Cloud", "AWS Landing Zone", "Azure Policy", "IAM Boundaries", "Boto3", "GitHub Actions"],
    metrics: [
      { label: "Accounts Provisioned", value: "120+" },
      { label: "Provisioning Time", value: "-85%" },
      { label: "Policy Compliance", value: "100%" }
    ],
    featured: true
  },
  {
    id: "dotnet-iis-automation",
    title: "Enterprise .NET CI/CD & IIS Server Automation",
    category: "DevOps",
    company: "SYSBIG TECHNOLOGIES (Dick's Sporting Goods)",
    period: "2020 - 2022",
    description: "Built multi-stage Azure DevOps build and release automation for high-volume .NET Core and ASP.NET applications, automating MSBuild compilation, IIS web administration, Key Vault secrets injection, and PowerShell deployment sanity checks.",
    highlights: [
      "Automated web.config and appsettings.json transformations for seamless multi-environment parity",
      "Automated IIS application pool management, SSL certificate binding, and virtual directory creation",
      "Zero-downtime rolling release configurations with automated smoke test verification"
    ],
    techStack: [".NET Core", "ASP.NET", "Azure Pipelines", "IIS 8.5/10", "PowerShell", "Azure Key Vault"],
    metrics: [
      { label: "Manual Effort Cut", value: "80%" },
      { label: "Release Reliability", value: "99.9%" },
      { label: "Award Won", value: "Best Performer" }
    ],
    featured: false
  }
];

export const EDUCATION = {
  degree: "Bachelor's Degree",
  university: "Yogi Vemana University (YVU)",
  aggregate: "70%",
  location: "India",
  highlights: [
    "Computer Science and Engineering Foundations",
    "Operating Systems, Computer Networks & Cloud Computing",
    "Software Engineering & Object-Oriented Programming"
  ]
};
