import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { certificates, GROUP_META } from "@/content/certificates";

const COLOR = {
  ink: "#111111",
  inkSoft: "#2a2a2a",
  muted: "#555555",
  accent: "#2196f3",
  rule: "#111111",
  divider: "#d4d4d4",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 36,
    paddingHorizontal: 36,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: COLOR.ink,
    lineHeight: 1.45,
  },
  // Header
  name: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.3,
    color: COLOR.ink,
  },
  headline: {
    marginTop: 6,
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: COLOR.accent,
    lineHeight: 1.4,
  },
  contactRow: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    fontSize: 9,
    color: COLOR.ink,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  contactIcon: {
    color: COLOR.accent,
    fontFamily: "Helvetica-Bold",
  },
  // Layout
  body: {
    marginTop: 14,
    flexDirection: "row",
    gap: 22,
  },
  main: {
    flexGrow: 1,
    flexBasis: 0,
    flexShrink: 1,
  },
  side: {
    width: 168,
    paddingLeft: 14,
    borderLeftWidth: 1,
    borderLeftColor: COLOR.divider,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: COLOR.ink,
    borderBottomWidth: 1.5,
    borderBottomColor: COLOR.rule,
    paddingBottom: 3,
    marginBottom: 7,
  },
  // Experience
  role: {
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR.divider,
    borderBottomStyle: "dashed",
  },
  roleFirst: {
    paddingTop: 2,
  },
  roleLast: {
    borderBottomWidth: 0,
    paddingBottom: 2,
  },
  roleName: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: COLOR.ink,
  },
  roleCompany: {
    marginTop: 1,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: COLOR.accent,
  },
  roleMeta: {
    marginTop: 2,
    fontSize: 8.5,
    color: COLOR.muted,
  },
  roleSummary: {
    marginTop: 5,
    fontSize: 9.5,
    color: COLOR.ink,
    lineHeight: 1.45,
  },
  bulletList: {
    marginTop: 4,
    gap: 2,
  },
  bullet: {
    flexDirection: "row",
    fontSize: 9,
    color: COLOR.ink,
    lineHeight: 1.4,
  },
  bulletDot: {
    width: 10,
    fontSize: 9,
    color: COLOR.ink,
  },
  bulletText: {
    flex: 1,
  },
  // Side column
  group: {
    marginBottom: 12,
  },
  groupTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: COLOR.accent,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingBottom: 3,
    marginBottom: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR.divider,
  },
  navItem: {
    fontSize: 9,
    color: COLOR.ink,
    paddingTop: 3,
    paddingBottom: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR.divider,
    borderBottomStyle: "dashed",
  },
  navItemLast: {
    borderBottomWidth: 0,
  },
  langRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 3,
    paddingBottom: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR.divider,
    borderBottomStyle: "dashed",
    fontSize: 9,
  },
  langName: {
    fontFamily: "Helvetica-Bold",
    color: COLOR.ink,
  },
  langLevel: {
    color: COLOR.muted,
    fontSize: 8.5,
  },
  link: {
    color: COLOR.ink,
    textDecoration: "none",
  },
});

const linkedinDisplay = "linkedin.com/in/srilan-catalinio";

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.bullet}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

function NavGroup({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <View style={styles.group} wrap={false}>
      <Text style={styles.groupTitle}>{title}</Text>
      <View>
        {items.map((item, idx) => (
          <Text
            key={item}
            style={[
              styles.navItem,
              idx === items.length - 1 ? styles.navItemLast : {},
            ]}
          >
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
}

export function ResumeDocument() {
  const certsByGroup = certificates.reduce<
    Record<string, typeof certificates>
  >((acc, cert) => {
    (acc[cert.group] ||= []).push(cert);
    return acc;
  }, {});

  return (
    <Document
      title="Catalinio CV"
      author={profile.name}
      subject={profile.headline}
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View>
          <Text style={styles.name}>{profile.name.toUpperCase()}</Text>
          <Text style={styles.headline}>{profile.resumeHeadline}</Text>
          <View style={styles.contactRow}>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>{"☎"}</Text>
              <Link
                src={`tel:${profile.phone.replace(/\s+/g, "")}`}
                style={styles.link}
              >
                {profile.phone}
              </Link>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>@</Text>
              <Link src={`mailto:${profile.email}`} style={styles.link}>
                {profile.email}
              </Link>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>{"↗"}</Text>
              <Link src={profile.socials.linkedin} style={styles.link}>
                {linkedinDisplay}
              </Link>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>{"◐"}</Text>
              <Link src={profile.website} style={styles.link}>
                srilan.info
              </Link>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>{"◉"}</Text>
              <Text>{profile.resumeLocation}</Text>
            </View>
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Left column */}
          <View style={styles.main}>
            {/* Summary */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Summary</Text>
              <Text>{profile.about}</Text>
            </View>

            {/* Experience */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              <View>
                {experience.map((role, i) => {
                  const isFirst = i === 0;
                  const isLast = i === experience.length - 1;
                  return (
                    <View
                      key={`${role.company}-${role.start}-${i}`}
                      style={[
                        styles.role,
                        isFirst ? styles.roleFirst : {},
                        isLast ? styles.roleLast : {},
                      ]}
                      wrap={false}
                    >
                      <Text style={styles.roleName}>{role.role}</Text>
                      <Text style={styles.roleCompany}>{role.company}</Text>
                      <Text style={styles.roleMeta}>
                        {role.start} - {role.end}
                        {role.location ? `   |   ${role.location}` : ""}
                      </Text>
                      <Text style={styles.roleSummary}>{role.summary}</Text>
                      {role.highlights.length > 0 && (
                        <View style={styles.bulletList}>
                          {role.highlights.map((h, idx) => (
                            <Bullet key={idx}>{h}</Bullet>
                          ))}
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Mentorship & Teaching */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Mentorship & Teaching</Text>
              <View>
                {profile.mentorship.map((m, i) => {
                  const isFirst = i === 0;
                  const isLast = i === profile.mentorship.length - 1;
                  return (
                    <View
                      key={m.title}
                      style={[
                        styles.role,
                        isFirst ? styles.roleFirst : {},
                        isLast ? styles.roleLast : {},
                      ]}
                      wrap={false}
                    >
                      <Text style={styles.roleName}>{m.title}</Text>
                      <Text style={styles.roleCompany}>{m.org}</Text>
                      <Text style={styles.roleMeta}>{m.period}</Text>
                      <View style={styles.bulletList}>
                        {m.bullets.map((b, idx) => (
                          <Bullet key={idx}>{b}</Bullet>
                        ))}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Education */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              <View>
                {profile.education.map((edu, i) => {
                  const isFirst = i === 0;
                  const isLast = i === profile.education.length - 1;
                  return (
                    <View
                      key={edu.school}
                      style={[
                        styles.role,
                        isFirst ? styles.roleFirst : {},
                        isLast ? styles.roleLast : {},
                      ]}
                      wrap={false}
                    >
                      <Text style={styles.roleName}>{edu.degree}</Text>
                      <Text style={styles.roleCompany}>{edu.school}</Text>
                      <Text style={styles.roleMeta}>
                        {edu.start} - {edu.end}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>

          {/* Right column */}
          <View style={styles.side}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              {profile.skillGroups.map((group) => (
                <NavGroup
                  key={group.title}
                  title={group.title}
                  items={group.items}
                />
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {Object.entries(certsByGroup).map(([groupKey, items]) => {
                const meta = GROUP_META[groupKey as keyof typeof GROUP_META];
                return (
                  <NavGroup
                    key={groupKey}
                    title={meta?.fullName ?? groupKey}
                    items={items.map((c) => c.title)}
                  />
                );
              })}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Languages</Text>
              <View>
                {profile.languages.map((lang, idx) => (
                  <View
                    key={lang.name}
                    style={[
                      styles.langRow,
                      idx === profile.languages.length - 1
                        ? { borderBottomWidth: 0 }
                        : {},
                    ]}
                  >
                    <Text style={styles.langName}>{lang.name}</Text>
                    <Text style={styles.langLevel}>{lang.level}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
