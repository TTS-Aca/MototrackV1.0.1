import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight, Wrench } from 'lucide-react-native';
import { useState } from 'react';
import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';

import { AuthField } from '@/components/mototrack/auth/auth-field.web';
import { AuthLegalText, AuthShell } from '@/components/mototrack/auth/auth-shell.web';
import { WorkshopMapPickerWeb } from '@/components/mototrack/workshop-map-picker.web';
import { AuthColors } from '@/constants/auth-theme';
import { Fonts } from '@/constants/theme';
import {
  DEFAULT_MAP_CENTER,
  WORKSHOP_BRANDS,
  defaultSchedule,
} from '@/constants/workshop';
import { useAuth } from '@/contexts/auth-context';
import { useWorkshop } from '@/contexts/workshop-context';
import type { DaySchedule, WorkshopBrand } from '@/types/workshop';

const STEPS = [
  { id: 1, title: 'Cuenta', desc: 'Acceso al panel del taller' },
  { id: 2, title: 'Negocio', desc: 'Datos legales y contacto' },
  { id: 3, title: 'Ubicación', desc: 'Dirección y marcas' },
  { id: 4, title: 'Horarios', desc: 'Atención y auxilio' },
] as const;

export function WorkshopRegisterScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { signIn } = useAuth();
  const { saveWorkshop } = useWorkshop();
  const isWide = width >= 900;

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(DEFAULT_MAP_CENTER.latitude);
  const [longitude, setLongitude] = useState(DEFAULT_MAP_CENTER.longitude);
  const [brands, setBrands] = useState<WorkshopBrand[]>([]);
  const [schedule, setSchedule] = useState<DaySchedule[]>(defaultSchedule);
  const [offersTowService, setOffersTowService] = useState(false);

  const toggleBrand = (brand: WorkshopBrand) => {
    if (brand === 'Multimarca') {
      setBrands((current) => (current.includes('Multimarca') ? [] : ['Multimarca']));
      return;
    }
    const withoutMulti = brands.filter((b) => b !== 'Multimarca');
    setBrands(
      withoutMulti.includes(brand)
        ? withoutMulti.filter((b) => b !== brand)
        : [...withoutMulti, brand],
    );
  };

  const updateDay = (index: number, patch: Partial<DaySchedule>) => {
    setSchedule((current) =>
      current.map((entry, i) => (i === index ? { ...entry, ...patch } : entry)),
    );
  };

  const validateStep = (currentStep: number): boolean => {
    if (currentStep === 1) {
      if (!email.trim()) {
        Alert.alert('Correo requerido', 'Ingresa el correo del taller.');
        return false;
      }
      if (password.length < 6) {
        Alert.alert('Contraseña corta', 'Usa al menos 6 caracteres.');
        return false;
      }
      if (password !== confirmPassword) {
        Alert.alert('Contraseñas distintas', 'Confirma que ambas contraseñas coincidan.');
        return false;
      }
    }
    if (currentStep === 2) {
      if (!name.trim()) {
        Alert.alert('Nombre requerido', 'Ingresa el nombre comercial del taller.');
        return false;
      }
      if (taxId.replace(/\D/g, '').length < 10) {
        Alert.alert('CUIT/RUT inválido', 'Ingresa un identificador fiscal válido.');
        return false;
      }
      if (phone.replace(/\D/g, '').length < 10) {
        Alert.alert('Teléfono inválido', 'Ingresa un teléfono de 10 dígitos.');
        return false;
      }
    }
    if (currentStep === 3) {
      if (!address.trim()) {
        Alert.alert('Dirección requerida', 'Ingresa la dirección exacta del taller.');
        return false;
      }
      if (brands.length === 0) {
        Alert.alert('Marcas requeridas', 'Selecciona al menos una marca.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;
    if (step < 4) {
      setStep((s) => s + 1);
      return;
    }
    handleSubmit();
  };

  const handleSubmit = () => {
    setSubmitting(true);
    saveWorkshop({
      email: email.trim(),
      name: name.trim(),
      taxId: taxId.replace(/[^\d-]/g, ''),
      phone: phone.replace(/\D/g, ''),
      address: address.trim(),
      latitude,
      longitude,
      brands,
      schedule,
      offersTowService,
    });
    signIn(email.trim(), 'workshop');
    router.replace('/');
    setSubmitting(false);
  };

  const openWhatsApp = () => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      Alert.alert('Teléfono incompleto', 'Completa el teléfono en el paso anterior.');
      return;
    }
    Linking.openURL(`https://wa.me/52${digits}`);
  };

  return (
    <AuthShell backHref="/login" wide>
      <View style={[styles.layout, isWide && styles.layoutWide]}>
        {isWide ? (
          <View style={styles.sidebar}>
            <View style={styles.sidebarIcon}>
              <Wrench size={22} color={AuthColors.surface} />
            </View>
            <Text style={styles.sidebarTitle}>Registra tu taller en MotoTrack</Text>
            <Text style={styles.sidebarCopy}>
              Publica tu negocio para que motociclistas te encuentren cerca, te contacten por
              WhatsApp y vean tus horarios actualizados.
            </Text>
            <View style={styles.stepList}>
              {STEPS.map(({ id, title, desc }) => (
                <View key={id} style={styles.stepListItem}>
                  <View style={[styles.stepDot, step >= id && styles.stepDotActive]}>
                    <Text style={[styles.stepDotText, step >= id && styles.stepDotTextActive]}>
                      {id}
                    </Text>
                  </View>
                  <View style={styles.stepListCopy}>
                    <Text style={[styles.stepListTitle, step === id && styles.stepListTitleActive]}>
                      {title}
                    </Text>
                    <Text style={styles.stepListDesc}>{desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        <View style={styles.formPanel}>
          {!isWide ? (
            <View style={styles.mobileProgress}>
              {STEPS.map(({ id, title }) => (
                <View key={id} style={styles.mobileProgressItem}>
                  <View style={[styles.stepDot, step >= id && styles.stepDotActive]}>
                    <Text style={[styles.stepDotText, step >= id && styles.stepDotTextActive]}>
                      {id}
                    </Text>
                  </View>
                  <Text style={[styles.mobileProgressLabel, step === id && styles.stepListTitleActive]}>
                    {title}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}

          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>{STEPS[step - 1].title}</Text>
            <Text style={styles.formSubtitle}>{STEPS[step - 1].desc}</Text>
          </View>

          {step === 1 ? (
            <View style={styles.form}>
              <AuthField
                label="CORREO DEL TALLER"
                icon="mail"
                value={email}
                onChangeText={setEmail}
                placeholder="taller@correo.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <AuthField
                label="CONTRASEÑA"
                icon="lock"
                value={password}
                onChangeText={setPassword}
                placeholder="Mínimo 6 caracteres"
                secureToggle
              />
              <AuthField
                label="CONFIRMAR CONTRASEÑA"
                icon="lock"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Repite la contraseña"
                secureToggle
              />
            </View>
          ) : null}

          {step === 2 ? (
            <View style={styles.form}>
              <AuthField
                label="NOMBRE DEL TALLER"
                value={name}
                onChangeText={setName}
                placeholder="Ej. Quintana Motor's"
              />
              <View style={styles.rowTwo}>
                <View style={styles.fieldHalf}>
                  <AuthField
                    label="CUIT / RUT"
                    value={taxId}
                    onChangeText={(v) => setTaxId(v.replace(/[^\d-]/g, '').slice(0, 13))}
                    placeholder="Identificador fiscal"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.fieldHalf}>
                  <AuthField
                    label="TELÉFONO"
                    value={phone}
                    onChangeText={(v) => setPhone(v.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10 dígitos"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
              <Pressable style={styles.whatsappBtn} onPress={openWhatsApp}>
                <Text style={styles.whatsappBtnText}>Probar enlace WhatsApp</Text>
              </Pressable>
            </View>
          ) : null}

          {step === 3 ? (
            <View style={styles.form}>
              <AuthField
                label="DIRECCIÓN EXACTA"
                value={address}
                onChangeText={setAddress}
                placeholder="Calle, número, colonia, ciudad"
              />
              <WorkshopMapPickerWeb
                latitude={latitude}
                longitude={longitude}
                onChange={({ latitude: lat, longitude: lng }) => {
                  setLatitude(lat);
                  setLongitude(lng);
                }}
              />
              <View style={styles.brandSection}>
                <Text style={styles.brandLabel}>MARCAS CON LAS QUE TRABAJAS</Text>
                <View style={styles.brandRow}>
                  {WORKSHOP_BRANDS.map((brand) => {
                    const selected = brands.includes(brand);
                    return (
                      <Pressable
                        key={brand}
                        onPress={() => toggleBrand(brand)}
                        style={[styles.brandPill, selected && styles.brandPillSelected]}>
                        <Text style={[styles.brandPillText, selected && styles.brandPillTextSelected]}>
                          {brand}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </View>
          ) : null}

          {step === 4 ? (
            <View style={styles.form}>
              <View style={styles.scheduleTable}>
                <View style={styles.scheduleHeader}>
                  <Text style={[styles.scheduleCell, styles.scheduleCellDay]}>Día</Text>
                  <Text style={styles.scheduleCell}>Apertura</Text>
                  <Text style={styles.scheduleCell}>Cierre</Text>
                  <Text style={styles.scheduleCell}>Cerrado</Text>
                </View>
                {schedule.map((entry, index) => (
                  <View key={entry.day} style={styles.scheduleRow}>
                    <Text style={[styles.scheduleCell, styles.scheduleCellDay]}>{entry.day}</Text>
                    <TextInput
                      value={entry.open}
                      editable={!entry.closed}
                      onChangeText={(open) => updateDay(index, { open })}
                      style={[styles.scheduleInput, entry.closed && styles.scheduleInputDisabled]}
                    />
                    <TextInput
                      value={entry.close}
                      editable={!entry.closed}
                      onChangeText={(close) => updateDay(index, { close })}
                      style={[styles.scheduleInput, entry.closed && styles.scheduleInputDisabled]}
                    />
                    <Switch
                      value={entry.closed}
                      onValueChange={(closed) => updateDay(index, { closed })}
                      trackColor={{ false: AuthColors.border, true: AuthColors.text }}
                    />
                  </View>
                ))}
              </View>
              <View style={styles.towRow}>
                <View style={styles.towCopy}>
                  <Text style={styles.towTitle}>¿Ofrece auxilio / remolque mecánico?</Text>
                  <Text style={styles.towHint}>Si se quedan tirados en la ruta, esto salva vidas.</Text>
                </View>
                <Switch
                  value={offersTowService}
                  onValueChange={setOffersTowService}
                  trackColor={{ false: AuthColors.border, true: AuthColors.text }}
                />
              </View>
            </View>
          ) : null}

          <View style={styles.actions}>
            {step > 1 ? (
              <Pressable style={styles.backStepBtn} onPress={() => setStep((s) => s - 1)}>
                <ChevronLeft size={16} color={AuthColors.text} />
                <Text style={styles.backStepText}>Anterior</Text>
              </Pressable>
            ) : (
              <View />
            )}
            <Pressable
              style={({ pressed }) => [styles.nextBtn, pressed && styles.pressed]}
              onPress={handleNext}
              disabled={submitting}>
              <Text style={styles.nextBtnText}>
                {step === 4 ? (submitting ? 'REGISTRANDO…' : 'PUBLICAR TALLER') : 'CONTINUAR'}
              </Text>
              {step < 4 ? <ChevronRight size={16} color={AuthColors.surface} /> : null}
            </Pressable>
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>¿Eres motociclista? </Text>
            <Pressable onPress={() => router.push('/register')}>
              <Text style={styles.switchLink}>Crear cuenta personal</Text>
            </Pressable>
          </View>

          <AuthLegalText />
        </View>
      </View>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    gap: 24,
  },
  layoutWide: {
    flexDirection: 'row',
    maxWidth: 960,
    alignSelf: 'center',
    gap: 48,
    alignItems: 'flex-start',
  },
  sidebar: {
    flex: 1,
    maxWidth: 340,
    gap: 16,
    paddingTop: 8,
  },
  sidebarIcon: {
    width: 44,
    height: 44,
    backgroundColor: AuthColors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sidebarTitle: {
    fontFamily: Fonts.serif,
    fontSize: 28,
    lineHeight: 32,
    color: AuthColors.text,
  },
  sidebarCopy: {
    fontSize: 14,
    lineHeight: 22,
    color: AuthColors.textMuted,
  },
  stepList: {
    gap: 16,
    marginTop: 8,
  },
  stepListItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  stepDot: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: AuthColors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AuthColors.surface,
  },
  stepDotActive: {
    backgroundColor: AuthColors.text,
    borderColor: AuthColors.text,
  },
  stepDotText: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    color: AuthColors.textMuted,
  },
  stepDotTextActive: {
    color: AuthColors.surface,
  },
  stepListCopy: {
    flex: 1,
    gap: 2,
  },
  stepListTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: AuthColors.textMuted,
  },
  stepListTitleActive: {
    color: AuthColors.text,
  },
  stepListDesc: {
    fontSize: 12,
    color: AuthColors.textFaint,
  },
  formPanel: {
    flex: 1,
    minWidth: 0,
    gap: 20,
  },
  mobileProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: AuthColors.border,
  },
  mobileProgressItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  mobileProgressLabel: {
    fontFamily: Fonts.mono,
    fontSize: 8,
    letterSpacing: 0.5,
    color: AuthColors.textFaint,
    textAlign: 'center',
  },
  formHeader: {
    gap: 6,
  },
  formTitle: {
    fontFamily: Fonts.serif,
    fontSize: 32,
    lineHeight: 36,
    color: AuthColors.text,
  },
  formSubtitle: {
    fontSize: 14,
    color: AuthColors.textMuted,
  },
  form: {
    gap: 16,
  },
  rowTwo: {
    flexDirection: 'row',
    gap: 12,
  },
  fieldHalf: {
    flex: 1,
  },
  whatsappBtn: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#25D366',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: 'rgba(37, 211, 102, 0.06)',
  },
  whatsappBtnText: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    letterSpacing: 1,
    color: '#15803d',
    fontWeight: '600',
  },
  brandSection: {
    gap: 10,
  },
  brandLabel: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    letterSpacing: 1.2,
    color: AuthColors.textMuted,
  },
  brandRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  brandPill: {
    borderWidth: 1,
    borderColor: AuthColors.border,
    backgroundColor: AuthColors.surface,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  brandPillSelected: {
    borderColor: AuthColors.text,
    backgroundColor: AuthColors.text,
  },
  brandPillText: {
    fontSize: 13,
    color: AuthColors.text,
  },
  brandPillTextSelected: {
    color: AuthColors.surface,
    fontWeight: '600',
  },
  scheduleTable: {
    borderWidth: 1,
    borderColor: AuthColors.border,
    backgroundColor: AuthColors.surface,
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: AuthColors.border,
    backgroundColor: AuthColors.background,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: AuthColors.border,
  },
  scheduleCell: {
    flex: 1,
    fontFamily: Fonts.mono,
    fontSize: 10,
    letterSpacing: 0.5,
    color: AuthColors.textMuted,
  },
  scheduleCellDay: {
    flex: 1.2,
    fontSize: 12,
    color: AuthColors.text,
  },
  scheduleInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: AuthColors.border,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 12,
    fontFamily: Fonts.mono,
    color: AuthColors.text,
    backgroundColor: AuthColors.background,
  },
  scheduleInputDisabled: {
    opacity: 0.35,
  },
  towRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: AuthColors.border,
    backgroundColor: AuthColors.surface,
  },
  towCopy: {
    flex: 1,
    gap: 4,
  },
  towTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: AuthColors.text,
  },
  towHint: {
    fontSize: 12,
    color: AuthColors.textMuted,
    lineHeight: 17,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingTop: 8,
  },
  backStepBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  backStepText: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    letterSpacing: 1,
    color: AuthColors.text,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: AuthColors.text,
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginLeft: 'auto',
  },
  nextBtnText: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    letterSpacing: 2,
    color: AuthColors.surface,
  },
  pressed: {
    opacity: 0.85,
  },
  switchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchText: {
    fontSize: 13,
    color: AuthColors.textMuted,
  },
  switchLink: {
    fontFamily: Fonts.mono,
    fontSize: 13,
    color: AuthColors.text,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});
