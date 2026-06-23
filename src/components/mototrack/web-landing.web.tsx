import { useRouter, type Href } from 'expo-router';
import {
  Activity,
  Brain,
  ChevronRight,
  Shield,
} from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { MotorcycleSVG } from '@/components/mototrack/motorcycle-svg';
import { PhoneFrame } from '@/components/mototrack/phone-frame.web';
import { ThemeToggleButton } from '@/components/mototrack/theme-toggle-button';
import { MotoTrackColors } from '@/constants/mototrack-colors';
import { PRICING_PLANS, PRICING_ROWS, PRICING_TAGLINE } from '@/constants/pricing-plans';
import { Fonts } from '@/constants/theme';
import { useMotoTrackTheme } from '@/contexts/theme-mode-context';

const navItems = ['Producto', 'Precios', 'Contacto'] as const;

const features = [
  {
    icon: Brain,
    title: 'IA Estructurada',
    desc: 'Análisis financiero automatizado adaptado al contexto de motocicletas en México. Detecta patrones de gasto y genera alertas accionables.',
    accent: MotoTrackColors.orange600,
    hoverBg: MotoTrackColors.light.orange50,
  },
  {
    icon: Activity,
    title: 'Telemetría Predictiva',
    desc: 'Monitoreo continuo del estado de tu moto. Saber cuándo ir al taller antes de que el taller sea una emergencia.',
    accent: MotoTrackColors.light.foreground,
    hoverBg: MotoTrackColors.light.accent,
  },
  {
    icon: Shield,
    title: 'Historial Certificado',
    desc: 'Registro inmutable de servicios, refacciones y combustible. Respaldo digital que multiplica el valor de reventa de tu moto.',
    accent: MotoTrackColors.light.foreground,
    hoverBg: MotoTrackColors.light.accent,
  },
] as const;

export function WebLanding() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { theme } = useMotoTrackTheme();
  const isLarge = width >= 1024;
  const isMedium = width >= 768;

  const scrollToSection = (id: string) => {
    if (typeof document !== 'undefined') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.rootContent}>
      <View style={[styles.nav, { backgroundColor: theme.navBackground, borderBottomColor: theme.border }]}>
        <View style={styles.navInner}>
          <View style={styles.navBrand}>
            <View style={[styles.navLogo, { backgroundColor: theme.text }]}>
              <Activity size={14} color={theme.background} strokeWidth={2.5} />
            </View>
            <Text style={[styles.navBrandText, { color: theme.textTertiary }]}>
              MotoTrack × Quintana Motor's
            </Text>
          </View>

          <View style={styles.navRight}>
            {isMedium &&
              navItems.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => {
                    if (item === 'Precios') scrollToSection('precios');
                  }}>
                  <Text style={[styles.navLink, { color: theme.textTertiary }]}>{item}</Text>
                </Pressable>
              ))}
            <ThemeToggleButton size={18} />
            <Pressable
              onPress={() => router.push('/login')}
              style={[styles.navLogin, { borderColor: theme.text }]}>
              <Text style={[styles.navLoginText, { color: theme.text }]}>Iniciar Sesión</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.hero}>
        <View style={[styles.badge, isLarge && styles.badgeLarge]}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>

          </Text>
        </View>

        <View style={[styles.heroGrid, isLarge && styles.heroGridLarge]}>
          <View style={styles.heroCopy}>
            <Text style={[styles.heroTitle, isLarge && styles.heroTitleLarge]}>
              MotoTrack &{'\n'}
              <Text style={styles.heroTitleItalic}>Quintana Motor's</Text>
            </Text>
            <Text style={[styles.heroSubtitle, isLarge && styles.heroSubtitleLarge]}>
              El SaaS Financiero{'\n'}para Motocicletas.
            </Text>
            <Text style={styles.heroTagline}>De un Gasto Ciego — a un Activo Certificado.</Text>

            <View style={styles.heroActions}>
              <Pressable style={styles.primaryBtn}>
                <Text style={styles.primaryBtnText}>SOLICITAR ACCESO</Text>
                <ChevronRight size={14} color={MotoTrackColors.light.background} />
              </Pressable>
              <Pressable style={styles.secondaryBtn}>
             
              </Pressable>
            </View>
          </View>

          {isLarge && (
            <View style={styles.heroPhone}>
              <PhoneFrame scale={0.88} />
            </View>
          )}
        </View>
      </View>

      <View style={styles.diagramSection}>
        <View style={styles.diagramWrap}>
          <MotorcycleSVG width="100%" color="rgba(9, 9, 11, 0.6)" />

          <View style={styles.labelTopRight}>
            <Text style={styles.labelOrange}>IA Estructurada</Text>
            <View style={styles.labelLineOrange} />
            <View style={styles.labelDotOrange} />
          </View>

          <View style={styles.labelMidRight}>
            <Text style={styles.labelMuted}>Historial Certificado</Text>
            <View style={styles.labelLine} />
            <View style={styles.labelDot} />
          </View>

          <View style={styles.labelLeft}>
            <View style={styles.labelDot} />
            <View style={styles.labelLine} />
            <Text style={styles.labelMuted}>Telemetría Predictiva</Text>
          </View>
        </View>
      </View>

      <View style={styles.featuresSection}>
        <View style={[styles.featuresGrid, isMedium && styles.featuresGridMedium]}>
          {features.map(({ icon: Icon, title, desc, accent }) => (
            <View key={title} style={styles.featureCard}>
              <Icon size={20} color={accent} strokeWidth={1.5} />
              <Text style={styles.featureTitle}>{title}</Text>
              <Text style={styles.featureDesc}>{desc}</Text>
              <View style={styles.featureLink}>
                <Text style={styles.featureLinkText}>Explorar</Text>
                <ChevronRight size={12} color={MotoTrackColors.light.mutedForeground} />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View nativeID="precios" style={styles.pricingSection}>
        <View style={styles.pricingHeader}>
          <Text style={styles.pricingEyebrow}>PRECIOS</Text>
          <Text style={[styles.pricingTitle, isMedium && styles.pricingTitleLarge]}>
            Elige el plan para tu moto.
          </Text>
          <Text style={styles.pricingSubtitle}>{PRICING_TAGLINE}</Text>
        </View>

        {isMedium ? (
          <View style={styles.pricingTable}>
            <View style={styles.pricingTableHeader}>
              <View style={styles.pricingTableLabelCol} />
              {PRICING_PLANS.map((plan) => (
                <View
                  key={plan.id}
                  style={[styles.pricingTableHeadCol, plan.highlighted && styles.pricingTableHeadHighlight]}>
                  <Text style={styles.pricingPlanName}>{plan.name}</Text>
                  {plan.highlighted ? (
                    <Text style={styles.pricingPlanBadge}>RECOMENDADO</Text>
                  ) : null}
                </View>
              ))}
            </View>
            {PRICING_ROWS.map(({ key, label }) => (
              <View key={key} style={styles.pricingTableRow}>
                <View style={styles.pricingTableLabelCol}>
                  <Text style={styles.pricingRowLabel}>{label}</Text>
                </View>
                {PRICING_PLANS.map((plan) => (
                  <View
                    key={`${plan.id}-${key}`}
                    style={[styles.pricingTableCell, plan.highlighted && styles.pricingTableCellHighlight]}>
                    <Text style={[styles.pricingCellText, key === 'price' && styles.pricingCellPrice]}>
                      {key === 'price'
                        ? `${plan.price}${plan.priceNote ? `\n${plan.priceNote}` : ''}`
                        : plan[key]}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.pricingCards}>
            {PRICING_PLANS.map((plan) => (
              <View
                key={plan.id}
                style={[styles.pricingCard, plan.highlighted && styles.pricingCardHighlight]}>
                <View style={styles.pricingCardHeader}>
                  <Text style={styles.pricingPlanName}>{plan.name}</Text>
                  {plan.highlighted ? (
                    <Text style={styles.pricingPlanBadge}>RECOMENDADO</Text>
                  ) : null}
                </View>
                <Text style={styles.pricingCardPrice}>{plan.price}</Text>
                {plan.priceNote ? <Text style={styles.pricingCardPriceNote}>{plan.priceNote}</Text> : null}
                {PRICING_ROWS.filter((row) => row.key !== 'price').map(({ key, label }) => (
                  <View key={key} style={styles.pricingCardRow}>
                    <Text style={styles.pricingRowLabel}>{label}</Text>
                    <Text style={styles.pricingCellText}>{plan[key]}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        <View style={styles.pricingActions}>
          <Pressable
            style={styles.primaryBtn}
            onPress={() => router.push('/register')}>
            <Text style={styles.primaryBtnText}>EMPEZAR GRATIS</Text>
            <ChevronRight size={14} color={MotoTrackColors.light.background} />
          </Pressable>
          <Pressable
            style={styles.secondaryBtn}
            onPress={() => router.push('/taller-register' as Href)}>
            <Text style={styles.secondaryBtnText}>REGISTRAR MI TALLER</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.ctaBand}>
        <View style={[styles.ctaInner, isMedium && styles.ctaInnerMedium]}>
          <View>
            <Text style={[styles.ctaTitle, isMedium && styles.ctaTitleLarge]}>
              Tu moto merece un balance general.
            </Text>
          </View>
          <Pressable style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>UNIRME A LA LISTA</Text>
            <ChevronRight size={14} color={MotoTrackColors.light.background} />
          </Pressable>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={[styles.footerInner, isMedium && styles.footerInnerMedium]}>
          <View style={styles.footerBrand}>
            <View style={styles.footerLogo}>
              <Activity size={12} color={MotoTrackColors.light.background} strokeWidth={2.5} />
            </View>
            <Text style={styles.footerBrandText}>MOTOTRACK × QUINTANA MOTOR'S</Text>
          </View>
          <Text style={styles.footerCopy}>© 2024 · México · Todos los derechos reservados</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: MotoTrackColors.light.background,
  },
  rootContent: {
    flexGrow: 1,
  },
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderBottomWidth: 1,
    borderBottomColor: MotoTrackColors.light.border,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  navInner: {
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  navLogo: {
    width: 24,
    height: 24,
    borderRadius: 3,
    backgroundColor: MotoTrackColors.light.foreground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBrandText: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    letterSpacing: 1.5,
    color: MotoTrackColors.light.mutedForeground,
    textTransform: 'uppercase',
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  navLink: {
    fontSize: 14,
    color: MotoTrackColors.light.mutedForeground,
  },
  navLogin: {
    borderWidth: 1,
    borderColor: MotoTrackColors.light.foreground,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  navLoginText: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    letterSpacing: 1,
    color: MotoTrackColors.light.foreground,
  },
  hero: {
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 16,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    borderWidth: 1,
    borderColor: MotoTrackColors.light.border,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 40,
  },
  badgeLarge: {
    marginBottom: 40,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22c55e',
  },
  badgeText: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    color: MotoTrackColors.light.mutedForeground,
    letterSpacing: 0.5,
  },
  heroGrid: {
    gap: 40,
  },
  heroGridLarge: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  heroCopy: {
    flex: 1,
  },
  heroTitle: {
    fontFamily: Fonts.serif,
    fontSize: 44,
    lineHeight: 46,
    color: MotoTrackColors.light.foreground,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  heroTitleLarge: {
    fontSize: 72,
    lineHeight: 76,
  },
  heroTitleItalic: {
    fontStyle: 'italic',
    color: MotoTrackColors.light.mutedForeground,
  },
  heroSubtitle: {
    fontFamily: Fonts.serif,
    fontSize: 28,
    lineHeight: 34,
    color: MotoTrackColors.light.foreground,
    marginBottom: 20,
  },
  heroSubtitleLarge: {
    fontSize: 36,
    lineHeight: 42,
  },
  heroTagline: {
    fontFamily: Fonts.mono,
    fontSize: 14,
    color: MotoTrackColors.light.mutedForeground,
    marginBottom: 40,
  },
  heroActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: MotoTrackColors.light.foreground,
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  primaryBtnText: {
    fontFamily: Fonts.mono,
    fontSize: 12,
    letterSpacing: 2,
    color: MotoTrackColors.light.background,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: MotoTrackColors.light.border,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  secondaryBtnText: {
    fontFamily: Fonts.mono,
    fontSize: 12,
    letterSpacing: 2,
    color: MotoTrackColors.light.foreground,
  },
  heroPhone: {
    alignItems: 'flex-end',
  },
  diagramSection: {
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  diagramWrap: {
    position: 'relative',
    maxWidth: 896,
    alignSelf: 'center',
    width: '100%',
  },
  labelTopRight: {
    position: 'absolute',
    top: '8%',
    right: '4%',
    alignItems: 'flex-end',
    gap: 4,
  },
  labelOrange: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    backgroundColor: MotoTrackColors.light.orange50,
    borderWidth: 1,
    borderColor: MotoTrackColors.light.orange200,
    color: MotoTrackColors.light.orange700,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  labelLineOrange: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(253, 186, 116, 0.6)',
    alignSelf: 'flex-end',
    marginRight: 8,
  },
  labelDotOrange: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: MotoTrackColors.orange400,
    alignSelf: 'flex-end',
    marginRight: 8,
  },
  labelMidRight: {
    position: 'absolute',
    top: '45%',
    right: '3%',
    alignItems: 'flex-end',
    gap: 4,
  },
  labelLeft: {
    position: 'absolute',
    top: '38%',
    left: '3%',
    alignItems: 'flex-start',
    gap: 4,
  },
  labelMuted: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    borderWidth: 1,
    borderColor: MotoTrackColors.light.border,
    backgroundColor: MotoTrackColors.light.background,
    color: MotoTrackColors.light.mutedForeground,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  labelLine: {
    width: 1,
    height: 20,
    backgroundColor: MotoTrackColors.light.border,
    marginLeft: 8,
  },
  labelDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(9, 9, 11, 0.4)',
    marginLeft: 8,
  },
  featuresSection: {
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  featuresGrid: {
    gap: 1,
    backgroundColor: MotoTrackColors.light.border,
  },
  featuresGridMedium: {
    flexDirection: 'row',
  },
  featureCard: {
    flex: 1,
    backgroundColor: MotoTrackColors.light.background,
    padding: 32,
    gap: 16,
  },
  featureTitle: {
    fontFamily: Fonts.serif,
    fontSize: 20,
    color: MotoTrackColors.light.foreground,
  },
  featureDesc: {
    fontSize: 14,
    lineHeight: 22,
    color: MotoTrackColors.light.mutedForeground,
    marginBottom: 8,
  },
  featureLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featureLinkText: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    color: MotoTrackColors.light.mutedForeground,
  },
  pricingSection: {
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 80,
    gap: 40,
    borderTopWidth: 1,
    borderTopColor: MotoTrackColors.light.border,
  },
  pricingHeader: {
    gap: 12,
    maxWidth: 640,
  },
  pricingEyebrow: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    letterSpacing: 2,
    color: MotoTrackColors.orange600,
  },
  pricingTitle: {
    fontFamily: Fonts.serif,
    fontSize: 32,
    lineHeight: 38,
    color: MotoTrackColors.light.foreground,
  },
  pricingTitleLarge: {
    fontSize: 40,
    lineHeight: 46,
  },
  pricingSubtitle: {
    fontFamily: Fonts.mono,
    fontSize: 13,
    color: MotoTrackColors.light.mutedForeground,
    lineHeight: 20,
  },
  pricingTable: {
    borderWidth: 1,
    borderColor: MotoTrackColors.light.border,
    backgroundColor: MotoTrackColors.light.background,
  },
  pricingTableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: MotoTrackColors.light.border,
    backgroundColor: MotoTrackColors.light.accent,
  },
  pricingTableLabelCol: {
    width: 160,
    padding: 16,
    justifyContent: 'center',
  },
  pricingTableHeadCol: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    gap: 6,
    borderLeftWidth: 1,
    borderLeftColor: MotoTrackColors.light.border,
  },
  pricingTableHeadHighlight: {
    backgroundColor: MotoTrackColors.light.orange50,
  },
  pricingPlanName: {
    fontFamily: Fonts.mono,
    fontSize: 13,
    letterSpacing: 2,
    fontWeight: '700',
    color: MotoTrackColors.light.foreground,
  },
  pricingPlanBadge: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    letterSpacing: 1,
    color: MotoTrackColors.light.orange700,
    backgroundColor: MotoTrackColors.light.orange50,
    borderWidth: 1,
    borderColor: MotoTrackColors.light.orange200,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  pricingTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: MotoTrackColors.light.border,
  },
  pricingTableCell: {
    flex: 1,
    padding: 16,
    borderLeftWidth: 1,
    borderLeftColor: MotoTrackColors.light.border,
    justifyContent: 'center',
  },
  pricingTableCellHighlight: {
    backgroundColor: 'rgba(255, 247, 237, 0.5)',
  },
  pricingRowLabel: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    letterSpacing: 1.2,
    color: MotoTrackColors.light.mutedForeground,
    textTransform: 'uppercase',
  },
  pricingCellText: {
    fontSize: 13,
    lineHeight: 20,
    color: MotoTrackColors.light.foreground,
  },
  pricingCellPrice: {
    fontFamily: Fonts.serif,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
  },
  pricingCards: {
    gap: 16,
  },
  pricingCard: {
    borderWidth: 1,
    borderColor: MotoTrackColors.light.border,
    backgroundColor: MotoTrackColors.light.background,
    padding: 24,
    gap: 12,
  },
  pricingCardHighlight: {
    borderColor: MotoTrackColors.light.orange200,
    backgroundColor: MotoTrackColors.light.orange50,
  },
  pricingCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  pricingCardPrice: {
    fontFamily: Fonts.serif,
    fontSize: 36,
    color: MotoTrackColors.light.foreground,
  },
  pricingCardPriceNote: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    color: MotoTrackColors.light.mutedForeground,
    marginTop: -4,
  },
  pricingCardRow: {
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: MotoTrackColors.light.border,
  },
  pricingActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  ctaBand: {
    borderTopWidth: 1,
    borderTopColor: MotoTrackColors.light.border,
    backgroundColor: MotoTrackColors.light.foreground,
    paddingHorizontal: 24,
    paddingVertical: 56,
  },
  ctaInner: {
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
    gap: 32,
  },
  ctaInnerMedium: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ctaEyebrow: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    letterSpacing: 2,
    color: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 8,
  },
  ctaTitle: {
    fontFamily: Fonts.serif,
    fontSize: 28,
    color: MotoTrackColors.light.background,
  },
  ctaTitleLarge: {
    fontSize: 36,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 32,
    paddingVertical: 14,
    alignSelf: 'flex-start',
  },
  ctaButtonText: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    letterSpacing: 2,
    color: MotoTrackColors.light.background,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: MotoTrackColors.light.foreground,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  footerInner: {
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
    gap: 12,
  },
  footerInnerMedium: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerLogo: {
    width: 20,
    height: 20,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerBrandText: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    letterSpacing: 1,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  footerCopy: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.3)',
  },
});
