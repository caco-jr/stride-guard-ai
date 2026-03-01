export interface ThreatData {
  description: string;
  threat_type: string;
  threat_level: "High" | "Medium" | "Low";
  possible_mitigation: string;
}

export interface ComponentData {
  name: string;
  description: string;
  threat: ThreatData;
}

export interface AnalysisResult {
  title: string;
  cloud: string;
  description: string;
  components: ComponentData[];
}

export const mockAnalysisResult: AnalysisResult = {
  title: "Industrial IoT Application on AWS",
  cloud: "AWS",
  description:
    "This architecture depicts an industrial IoT application leveraging AWS services. It collects data from industrial plants/factories, processes it using Kelvin applications, and provides insights to Kelvin users.",
  components: [
    {
      name: "Industrial Gateway/PLC",
      description:
        "Programmable Logic Controller (PLC) acts as an interface between the industrial equipment and data store.",
      threat: {
        description:
          "Compromise of the Industrial Gateway/PLC could lead to unauthorized control over the industrial equipment.",
        threat_type: "Tampering",
        threat_level: "High",
        possible_mitigation:
          "Implement strong authentication and authorization controls. Regularly update firmware to patch vulnerabilities. Segment the network to isolate the PLC.",
      },
    },
    {
      name: "Kelvin Node",
      description:
        "Node in the edge gateway for processing and forwarding data.",
      threat: {
        description:
          "An attacker could potentially gain unauthorized access to the Kelvin Node and spoof data sent to the cloud, leading to incorrect analysis and control actions.",
        threat_type: "Spoofing",
        threat_level: "High",
        possible_mitigation:
          "Implement mutual authentication between the Kelvin Node and the cloud services using TLS certificates. Implement intrusion detection and prevention systems at the edge.",
      },
    },
    {
      name: "Application Load Balancer",
      description:
        "Distributes incoming application traffic across multiple targets.",
      threat: {
        description:
          "A DDoS attack targeting the Application Load Balancer could overwhelm the system.",
        threat_type: "Denial of Service",
        threat_level: "Medium",
        possible_mitigation:
          "Enable AWS Shield and AWS WAF to protect against DDoS attacks. Implement rate limiting.",
      },
    },
    {
      name: "Amazon EKS Kelvin cluster",
      description:
        "Managed Kubernetes service to run containerized applications.",
      threat: {
        description:
          "Compromise of the Kubernetes cluster could lead to unauthorized access to sensitive data.",
        threat_type: "Elevation of Privilege",
        threat_level: "High",
        possible_mitigation:
          "Implement strong RBAC policies. Update Kubernetes regularly. Use network policies.",
      },
    },
    {
      name: "Amazon S3",
      description: "Object storage service for storing data.",
      threat: {
        description:
          "If S3 buckets are not properly configured, sensitive data could be exposed to the public.",
        threat_type: "Information Disclosure",
        threat_level: "Medium",
        possible_mitigation:
          "Implement proper access controls using IAM policies. Enable encryption at rest.",
      },
    },
  ],
};

export function countThreats(components: ComponentData[]) {
  let high = 0;
  let medium = 0;
  let low = 0;
  components.forEach((c) => {
    switch (c.threat.threat_level) {
      case "High": high++; break;
      case "Medium": medium++; break;
      case "Low": low++; break;
    }
  });
  return { high, medium, low, total: components.length };
}
