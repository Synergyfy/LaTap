// Icon mapping from Material Icons to Lucide React
// This provides a centralized reference for icon replacements

import {
  Home, Users, UserPlus, Repeat, Calendar, TrendingUp, TrendingDown,
  Bell, Search, LogOut, Menu, X, ChevronDown, ChevronLeft, ChevronRight,
  Plus, Settings,  HelpCircle, Nfc, Mail, Phone, Check, CheckCircle,
  AlertCircle, AlertTriangle, Info, Download, Upload, Filter, MoreVertical,
  Eye, Edit, Trash2, Star, Gift, Target, Send, BarChart, PieChart,
  DollarSign, CreditCard, ShoppingBag, Package, Zap, Shield, Lock,
  Unlock, Key, MapPin, Clock, ArrowRight, ArrowLeft, ExternalLink,
  Copy, Share2, Bookmark, Heart, MessageSquare, ThumbsUp, Award,
  Briefcase, Building, Store, Activity, Wifi, WifiOff, RefreshCw,
  Power, PauseCircle, PlayCircle, StopCircle, Radio, Smartphone,
  Tablet, Monitor, Printer, Camera, Image, File, FileText, Folder,
  Save, Archive, Inbox, Layers, Grid, List, Tag, Tags, Users2,
  UserCheck, UserMinus, UserX, Circle, Disc, Square, Triangle,
  Hexagon, Octagon, Pentagon, Star as StarIcon, Sparkles, Flame,
  Sun, Moon, CloudRain, Wind, Droplet, Thermometer, Anchor, Compass,
  Navigation, Map as MapIcon, Route, Flag, MapPin as Pin, Crosshair,
  Maximize, Minimize, ZoomIn, ZoomOut, Scan, QrCode, Barcode,
  Sliders, ToggleLeft, ToggleRight, Volume, Volume1, Volume2,
  VolumeX, Mic, MicOff, Video, VideoOff, Cast, Airplay, Bluetooth,
  Cast as CastIcon, Cpu, Database, HardDrive, Server, Cloud,
  CloudOff, Loader, RotateCw, RotateCcw, Repeat as RepeatIcon,
  Shuffle, SkipBack, SkipForward, Trash, Link, Unlink, Paperclip,
  Download as DownloadIcon, Upload as UploadIcon, Scissors, Clipboard,
  Type, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  AlignJustify, Code, Terminal, AtSign, Hash, DollarSign as Dollar,
  Percent, Slash, Asterisk, Equal, Minus, PlusCircle, MinusCircle,
  CheckCircle as CheckCircleIcon, XCircle, AlertCircle as AlertCircleIcon,
  HelpCircle as HelpCircleIcon, Info as InfoIcon, AlertTriangle as AlertTriangleIcon,
  LogIn,
} from 'lucide-react';

export const icons = {
  // Navigation
  dashboard: Home,
  home: Home,
  menu: Menu,
  close: X,
  search: Search,
  nfc: Nfc,
  
  // Users & People
  group: Users,
  people: Users2,
  person: UserCheck,
  person_add: UserPlus,
  person_remove: UserMinus,
  
  // Actions
  add: Plus,
  edit: Edit,
  delete: Trash2,
  delete_forever: Trash,
  save: Save,
  download: Download,
  upload: Upload,
  copy: Copy,
  share: Share2,
  
  // Status & Feedback
  check: Check,
  check_circle: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  
  // Trends
  trending_up: TrendingUp,
  trending_down: TrendingDown,
  analytics: BarChart,
  bar_chart: BarChart,
  pie_chart: PieChart,
  activity: Activity,
  
  // Communication
  notifications: Bell,
  email: Mail,
  campaign: Send,
  message: MessageSquare,
  phone: Phone,
  
  // Settings & Config
  settings: Settings,
  help_outline: HelpCircle,
  expand_more: ChevronDown,
  chevron_left: ChevronLeft,
  chevron_right: ChevronRight,
  
  // Authentication
  logout: LogOut,
  login: LogIn,
  lock: Lock,
  unlock: Unlock,
  key: Key,
  
  // Business & Commerce
  loyalty: Gift,
  redeem: Award,
  monetization_on: DollarSign,
  shopping_bag: ShoppingBag,
  storefront: Store,
  store: Building,
  
  // Dates & Time
  today: Calendar,
  event: Calendar,
  schedule: Clock,
  repeat: Repeat,
  
  // Misc
  stars: Star,
  star: Star,
  bolt: Zap,
  flash_on: Zap,
  security: Shield,
  arrow_forward: ArrowRight,
  arrow_back: ArrowLeft,
  more_vert: MoreVertical,
  visibility: Eye,
  file_download: Download,
  refresh: RefreshCw,
  filter_list: Filter,
  circle: Circle,
  radio_button_unchecked: Circle,
  auto_awesome: Sparkles,
  fitness_center: Activity,
  
  // Devices
  devices: Monitor,
  smartphone: Smartphone,
  tablet: Tablet,
  
  // Files
  folder: Folder,
  description: FileText,
  
  // Location
  location_on: MapPin,
  place: MapPin,
  
  // Connection
  wifi: Wifi,
  wifi_off: WifiOff,
  bluetooth: Bluetooth,
  
  // Power
  power_settings_new: Power,
  
  // Business specific
  briefcase: Briefcase,
  target: Target,
  badge: Award,
  bookmark: Bookmark,
  flag: Flag,
};

// Export individual icon components for tree-shaking
export {
  Home, Users, UserPlus, Repeat, Calendar, TrendingUp, TrendingDown,
  Bell, Search, LogOut, Menu, X, ChevronDown, ChevronLeft, ChevronRight,
  Plus, Settings, HelpCircle, Nfc, Mail, Phone, Check, CheckCircle,
  AlertCircle, AlertTriangle, Info, Download, Upload, Filter, MoreVertical,
  Eye, Edit, Trash2, Star, Gift, Target, Send, BarChart, PieChart,
  DollarSign, CreditCard, ShoppingBag, Package, Zap, Shield,
};

export type IconName = keyof typeof icons;
