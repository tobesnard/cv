import { computed } from 'vue'
import { useAppStore } from '../store/appStore'
import {
    Printer as PrinterIcon,
    Sun as SunIcon,
    Moon as MoonIcon,
    Languages as LanguagesIcon,
    User as UserIcon,
    Code as CodeIcon,
    Briefcase as BriefcaseIcon,
    GraduationCap as GraduationCapIcon,
    Heart as HeartIcon,
    MapPin as MapPinIcon,
    Phone as PhoneIcon,
    Github as GithubIcon,
    Mail as MailIcon
} from 'lucide-vue-next'

/**
 * Composable useTheme (Version Pinia)
 */
export function useTheme() {
    /** Accès au store principal de l'application */
    const store = useAppStore()

    /** Dictionnaire des icônes utilisées dans l'interface (Lucide Components) */
    const icons = {
        User: UserIcon,
        Code: CodeIcon,
        Briefcase: BriefcaseIcon,
        Graduation: GraduationCapIcon,
        Heart: HeartIcon,
        MapPin: MapPinIcon,
        Phone: PhoneIcon,
        Github: GithubIcon,
        Mail: MailIcon,
        printer: PrinterIcon,
        sun: SunIcon,
        moon: MoonIcon,
        languages: LanguagesIcon
    }

    /** Mapping direct vers l'état du store */
    const isDarkMode = computed(() => store.isDarkMode)
    const currentTheme = computed(() => store.currentTheme)
    const activeBackgroundImage = computed(() => store.activeBackgroundImage)
    const toggleTheme = store.toggleTheme

    return {
        isDarkMode,
        currentTheme,
        icons,
        activeBackgroundImage,
        toggleTheme
    }
}
