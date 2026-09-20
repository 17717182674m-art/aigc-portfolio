// ---------------------------------------------------------------------------
// 作品集配置 — 改这里就能全站生效。
// 姓名、邮箱、社交链接、以及各项目的图片 / 视频 / 文案，都在这里替换。
// image / video 留空时，站点会自动渲染生成式渐变占位图（同模板原有逻辑）。
// ---------------------------------------------------------------------------

export const artist = {
  name: 'YOUR NAME',
  monogram: 'Y',
  role: 'AIGC VISUAL DESIGNER',
  subtitle: 'Visual Design · AI Image · AI Film · Creative Direction',
  intro:
    'Exploring the intersection of design, artificial intelligence and visual storytelling.',
  about: [
    'I am a visual designer exploring the intersection of design, artificial intelligence and visual storytelling.',
    'My work spans visual design, AIGC imagery, AI filmmaking, branding, UI design and creative direction.',
    'I use AI not simply as a generation tool, but as part of a complete creative workflow — from concept and visual development to final production.',
  ],
  email: 'hello@yourdomain.com',
  location: 'Remote · Worldwide',
  available: true,
  socials: [
    { label: 'EMAIL', href: 'mailto:hello@yourdomain.com' },
    { label: 'WECHAT', href: '#' },
    { label: 'BEHANCE', href: '#' },
    { label: 'XIAOHONGSHU', href: '#' },
  ],
}

/* ------------------------------------------------------------------ */
/*  分类                                                                */
/* ------------------------------------------------------------------ */

export type CategoryId =
  | 'aigc'
  | 'aifilm'
  | 'poster'
  | 'branding'
  | 'ui'
  | 'ip'
  | 'illustration'
  | 'portrait'
  | 'commercial'

export const categories: { id: 'all' | CategoryId; label: string; zh: string }[] = [
  { id: 'all', label: 'ALL', zh: '全部' },
  { id: 'aigc', label: 'AIGC', zh: 'AI视觉创作' },
  { id: 'aifilm', label: 'AI FILM', zh: 'AI视频 / AI短剧' },
  { id: 'poster', label: 'POSTER', zh: '海报设计' },
  { id: 'branding', label: 'BRANDING', zh: '品牌 / VI设计' },
  { id: 'ui', label: 'UI / APP', zh: 'UI界面设计' },
  { id: 'ip', label: 'IP DESIGN', zh: 'IP形象设计' },
  { id: 'illustration', label: 'ILLUSTRATION', zh: '插画设计' },
  { id: 'portrait', label: 'AI PORTRAIT', zh: 'AI写真' },
  { id: 'commercial', label: 'COMMERCIAL', zh: '商业视觉 / 电商视觉' },
]

export const categoryLabel: Record<CategoryId, string> = {
  aigc: 'AI IMAGE',
  aifilm: 'AI FILM',
  poster: 'POSTER',
  branding: 'BRAND',
  ui: 'UI / APP',
  ip: 'IP DESIGN',
  illustration: 'ILLUSTRATION',
  portrait: 'AI PORTRAIT',
  commercial: 'COMMERCIAL',
}

/* ------------------------------------------------------------------ */
/*  作品数据模型                                                         */
/* ------------------------------------------------------------------ */

export type ProjectImage = {
  /** 图片地址。留空则渲染生成式占位图 */
  src?: string
  aspect: string
  /** 图片在版式中的宽度节奏 */
  width: 'full' | 'wide' | 'half' | 'third'
  caption?: string
  glyph?: string
}

export type FilmShot = {
  time: string
  label: string
  aspect: string
  glyph?: string
  src?: string
}

export type Project = {
  id: string
  index: string
  title: string
  zh: string
  category: CategoryId
  year: string
  role: string
  tools: string[]
  tagline: string
  aspect: string
  palette: string[]
  seed: string
  /** 可选：真实封面图，留空用占位 */
  image?: string
  /** AI FILM：hover 静音预览视频 */
  video?: string

  overview: string
  concept: string
  visualDirection?: string
  process?: string
  images: ProjectImage[]
  beforeAfter?: { beforeLabel: string; afterLabel: string }
  film?: { story: string; character: string; timeline: FilmShot[] }
  result: string
  metrics?: { value: string; label: string }[]
}

/* ------------------------------------------------------------------ */
/*  视频素材（CloudFront CDN）                                          */
/* ------------------------------------------------------------------ */

export const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4'

export const FILM_CLIPS = {
  goldenHour:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4',
  stillWater:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4',
  deepWoods:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4',
  quietDawn:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4',
  showreel:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4',
}

/* ------------------------------------------------------------------ */
/*  色板 — 每个项目一组暗调配色，统一于黑底                              */
/* ------------------------------------------------------------------ */

const P = {
  lumora: ['#0a1220', '#1a2a3a', '#050a12', '#2a4a5a'],
  mist: ['#0a1a2e', '#1a3a5a', '#041018', '#2a5a7a'],
  wander: ['#0a2a1a', '#1a4a2a', '#05120a', '#2a6a3a'],
  yu: ['#1a120a', '#3a2a1a', '#0a0805', '#5a3a1a'],
  diary: ['#0a0a2a', '#1a1a4a', '#050518', '#2a2a7a'],
  yaya: ['#2a0e02', '#5a2a0a', '#1a0a02', '#7a3a0a'],
  flora: ['#021a0e', '#0a3a1a', '#011008', '#1a5a2a'],
  cloud: ['#1a0b2e', '#3a1255', '#0a0512', '#5a1a7a'],
  star: ['#031a2e', '#0a3a4a', '#021018', '#1a5a6a'],
  shape: ['#0a0a0f', '#1a1a2a', '#050508', '#2a2a3a'],
}

/* ------------------------------------------------------------------ */
/*  作品列表                                                            */
/* ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    id: 'lumora',
    index: '01',
    title: 'Lumora',
    zh: '冥想应用视觉系统',
    category: 'aigc',
    year: '2026',
    role: 'Visual Design / AIGC / Creative Direction',
    tools: ['Midjourney', 'ComfyUI', 'Seedance', 'Figma', 'After Effects'],
    tagline: '为冥想应用构建的全景视觉语言 — 从品牌概念到沉浸式动态场景。',
    aspect: 'aspect-[16/10]',
    palette: P.lumora,
    seed: 'lumora',
    video: FILM_CLIPS.goldenHour,
    overview:
      'Lumora 是一个以「回归内在宁静」为核心理念的冥想与专注应用。我们为其构建了完整的视觉识别系统：四段自然场景影像作为产品灵魂，配合克制的界面语言，让每一次打开都像一次呼吸。',
    concept:
      '「Clarity in an Endlessly Noisy Universe」—— 在信息过载的时代，Lumora 用自然界的纯粹时刻对抗噪音。金色时刻、静水、深林、黎明，四个场景分别对应一天中不同的身心状态。',
    visualDirection:
      '画面追求电影级自然光质感：低饱和、高宽容度、真实的颗粒与空气感。界面层采用液面玻璃（liquid glass）隐喻，让信息悬浮于自然影像之上，而非遮挡。',
    process:
      '从 Midjourney 关键词实验起步，用 ComfyUI 控制构图与光照一致性；场景动态部分由 Seedance 生成并逐帧筛选，最后在 After Effects 中统一调色与叠加液面玻璃层。',
    images: [
      { width: 'full', aspect: 'aspect-video', glyph: 'L' },
      { width: 'half', aspect: 'aspect-[3/4]', glyph: '01' },
      { width: 'half', aspect: 'aspect-[3/4]', glyph: '02' },
      { width: 'wide', aspect: 'aspect-[16/9]', glyph: 'GLASS' },
      { width: 'third', aspect: 'aspect-[4/5]', glyph: 'DAWN' },
      { width: 'third', aspect: 'aspect-[4/5]', glyph: 'WOODS' },
      { width: 'third', aspect: 'aspect-[4/5]', glyph: 'WATER' },
    ],
    beforeAfter: { beforeLabel: 'AI 原始生成', afterLabel: '最终视觉设计' },
    result:
      '最终交付 1 套品牌视觉规范、4 条沉浸式场景影像、以及完整的界面动效系统。上线后「找回专注」转化率提升 32%。',
    metrics: [
      { value: '4', label: '场景影像' },
      { value: '32%', label: '转化提升' },
      { value: '01', label: '视觉规范' },
    ],
  },
  {
    id: 'mist-theater',
    index: '02',
    title: 'Mist Theater',
    zh: '迷雾剧场 · AI 短剧',
    category: 'aifilm',
    year: '2026',
    role: 'AI Filmmaker / Storyboard / Creative Direction',
    tools: ['Seedance', 'ComfyUI', 'After Effects', 'Premiere'],
    tagline: '一部由 AI 全程生成的东方美学短片 — 迷雾中的人，与记忆的对峙。',
    aspect: 'aspect-video',
    palette: P.mist,
    seed: 'mist-theater',
    video: FILM_CLIPS.stillWater,
    overview:
      '《迷雾剧场》是一部 3 分钟的实验性 AI 短片：主角在浓雾弥漫的湖畔醒来，发现所有记忆都被冻结成静水。全片由 AI 影像生成，讲述「遗忘与和解」的故事。',
    concept:
      '以「水」为叙事母题 —— 静水既是遗忘的隐喻，也是时间流动的容器。分镜刻意保持长镜头与缓慢的运动，让 AI 生成的自然奇观承担情绪。',
    visualDirection:
      '东方水墨的留白与电影胶片的颗粒感结合。低饱和青灰调，偶有暖色记忆闪回，制造情绪上的冷暖对峙。',
    process:
      '先用文字脚本拆解为 24 个分镜，Seedance 逐镜生成后人工挑选「灵光时刻」，再经 ComfyUI 修复细节、After Effects 统一调色与呼吸感，Premiere 完成剪辑与音画对位。',
    images: [
      { width: 'full', aspect: 'aspect-video', glyph: 'MIST' },
      { width: 'half', aspect: 'aspect-[3/4]', glyph: 'SHOT 01' },
      { width: 'half', aspect: 'aspect-[3/4]', glyph: 'SHOT 02' },
      { width: 'wide', aspect: 'aspect-[16/9]', glyph: 'STORYBOARD' },
    ],
    film: {
      story:
        '凌晨 4 点，湖畔。她回到记忆冻结的故乡，在静水中看见自己从未说出口的告别。没有台词，只有水声与呼吸。',
      character:
        '「她」—— 由 AI 生成的恒定角色：一袭深灰长衣，始终背对镜头，只有结尾一瞬回头。角色的脸仅出现 2 秒，是全文案的谜底。',
      timeline: [
        { time: '00:00', label: '晨雾 · 醒来', aspect: 'aspect-[16/9]', glyph: 'M1' },
        { time: '00:05', label: '湖畔 · 凝视', aspect: 'aspect-[16/9]', glyph: 'M2' },
        { time: '00:10', label: '记忆 · 闪回', aspect: 'aspect-[16/9]', glyph: 'M3' },
        { time: '00:15', label: '告别 · 回眸', aspect: 'aspect-[16/9]', glyph: 'M4' },
      ],
    },
    result:
      '成片入围国内 AI 影像展映单元，全网播放量 120w+。验证了「AI 生成 + 人类审美筛选」的完整工作流可以承载严肃叙事。',
    metrics: [
      { value: '3min', label: '成片时长' },
      { value: '24', label: '分镜数量' },
      { value: '120w+', label: '播放量' },
    ],
  },
  {
    id: 'wander-series',
    index: '03',
    title: 'Wander Series',
    zh: '山野漫游 · 系列海报',
    category: 'poster',
    year: '2026',
    role: 'Graphic Design / AIGC',
    tools: ['Midjourney', 'Photoshop'],
    tagline: '六张海报，六种山野天气 — 把自然变化做成可悬挂的诗。',
    aspect: 'aspect-[3/4]',
    palette: P.wander,
    seed: 'wander-series',
    video: FILM_CLIPS.deepWoods,
    overview:
      '「山野漫游」是为独立户外品牌创作的季度海报系列：雾、雨、雪、晴、风、夜，六种天气对应六种出行状态。',
    concept:
      '以天气为叙事主角，人只是画面中极小的注脚。让自然的尺度重新教会我们谦卑。',
    visualDirection:
      '细线描边与写实 AI 风景结合：海报主体为 AI 生成的超写实山景，叠加手工蚀刻般的标题与编号，形成「机器之眼 + 人之手」的对话。',
    process:
      'Midjourney 生成 120+ 张候选，按构图与天气氛围精选 18 张，Photoshop 统一版式、字距与纸张纹理，最终输出六张标准系列海报。',
    images: [
      { width: 'full', aspect: 'aspect-[21/9]', glyph: 'SERIES' },
      { width: 'third', aspect: 'aspect-[3/4]', glyph: 'FOG' },
      { width: 'third', aspect: 'aspect-[3/4]', glyph: 'RAIN' },
      { width: 'third', aspect: 'aspect-[3/4]', glyph: 'SNOW' },
      { width: 'half', aspect: 'aspect-[4/5]', glyph: 'WIND' },
      { width: 'half', aspect: 'aspect-[4/5]', glyph: 'NIGHT' },
    ],
    result: '系列发布后 2 周售罄，并受邀在本地设计周展出。',
    metrics: [
      { value: '06', label: '张海报' },
      { value: '18', label: '精选画面' },
      { value: '2w', label: '售罄周期' },
    ],
  },
  {
    id: 'yu-tea',
    index: '04',
    title: 'YU · Tea House',
    zh: '屿 · 茶饮品牌视觉',
    category: 'branding',
    year: '2026',
    role: 'Brand Design / AIGC / Art Direction',
    tools: ['Midjourney', 'Illustrator', 'Figma', 'Photoshop'],
    tagline: '一座漂在茶汤上的小岛 — 新式茶饮品牌「屿」的全案视觉。',
    aspect: 'aspect-[4/5]',
    palette: P.yu,
    seed: 'yu-tea',
    video: FILM_CLIPS.quietDawn,
    overview:
      '「屿」是一个主打慢发酵茶的新式茶饮品牌。我们从品牌名出发，构建了「岛屿」为核心意象的完整视觉体系：logo、包装、空间物料与社交内容。',
    concept:
      '茶汤是海，杯底是岛。每一次冲泡，都是一次小规模的登陆。品牌语调克制、温暖，像茶本身一样需要时间。',
    visualDirection:
      '暖褐与米白为主色，AI 生成的云雾岛屿影像作为品牌主视觉，配合细腻的排版与纸感材质，营造「第三空间」的松弛感。',
    process:
      '品牌命名与概念共创 → Midjourney 生成岛屿意象素材库 → Illustrator 构建 logo 与辅助图形 → Figma 搭建 VI 手册与门店物料 → 最终输出整套品牌资产。',
    images: [
      { width: 'full', aspect: 'aspect-[21/10]', glyph: 'YU' },
      { width: 'wide', aspect: 'aspect-[16/9]', glyph: 'ISLAND' },
      { width: 'half', aspect: 'aspect-square', glyph: 'LOGO' },
      { width: 'half', aspect: 'aspect-square', glyph: 'PACK' },
    ],
    beforeAfter: { beforeLabel: 'AI 原始生成', afterLabel: '最终品牌视觉' },
    result: '首店开业 3 个月即登顶区域人气榜，品牌提案获客户全票通过。',
    metrics: [
      { value: '01', label: '品牌全案' },
      { value: '3mo', label: '首店登顶' },
      { value: '100%', label: '提案通过' },
    ],
  },
  {
    id: 'meditation-diary',
    index: '05',
    title: 'Meditation Diary',
    zh: '冥想日记 · 应用界面',
    category: 'ui',
    year: '2026',
    role: 'UI Design / AIGC / Product Design',
    tools: ['Figma', 'Midjourney', 'ComfyUI'],
    tagline: '把每天三分钟的安静，变成可回看的日记。',
    aspect: 'aspect-[3/4]',
    palette: P.diary,
    seed: 'meditation-diary',
    overview:
      '冥想日记是一款记录「每日心境」的极简应用。界面只做一件事：让用户在三分钟内完成一次记录，并温柔地看见自己的变化。',
    concept:
      '用 AI 生成的心境画面替代传统的表情图标 —— 每一次记录，都是一张由情绪驱动的抽象风景。',
    visualDirection:
      '深空蓝为底，AI 生成的极简抽象风景作为情绪可视化核心，微光文字与大量留白维持记录的私密感。',
    process:
      '竞品分析与信息架构 → 低保真原型 → 用 Midjourney 探索情绪视觉 → 高保真设计 → 微交互动效原型。',
    images: [
      { width: 'full', aspect: 'aspect-video', glyph: 'UI' },
      { width: 'third', aspect: 'aspect-[9/19]', glyph: 'HOME' },
      { width: 'third', aspect: 'aspect-[9/19]', glyph: 'RECORD' },
      { width: 'third', aspect: 'aspect-[9/19]', glyph: 'DIARY' },
    ],
    result: '产品原型在 60 位内测用户中留存率达 74%，入选年度独立应用提名。',
    metrics: [
      { value: '74%', label: '内测留存' },
      { value: '3min', label: '单次记录' },
      { value: '01', label: '提名奖项' },
    ],
  },
  {
    id: 'yaya-ip',
    index: '06',
    title: 'YAYA',
    zh: '芽芽 · IP 形象设计',
    category: 'ip',
    year: '2026',
    role: 'IP Design / AIGC / Creative Direction',
    tools: ['Midjourney', 'ComfyUI', 'Illustrator', 'Blender'],
    tagline: '一颗刚刚发芽的好奇心 — 品牌吉祥物「芽芽」的诞生。',
    aspect: 'aspect-square',
    palette: P.yaya,
    seed: 'yaya-ip',
    overview:
      '「芽芽」是为一款儿童教育产品设计的 IP 形象：一颗不会长大的种子，永远对世界保持好奇。需要从概念到三维资产全链路落地。',
    concept:
      '用「发芽」的瞬间凝固为永恒姿态 —— 头顶的嫩芽既是表情，也是情绪指示灯。开心时舒展，思考时蜷曲。',
    visualDirection:
      '陶土质感 + 柔和光影，让 AI 生成的三维形象摆脱「塑料感」，接近手作的温度。辅助图形从芽点发散，形成完整的 IP 视觉语言。',
    process:
      '性格设定与草图 → Midjourney 生成形象探索 → ComfyUI 统一三视图 → Blender 建模与渲染 → 表情包与场景延展。',
    images: [
      { width: 'full', aspect: 'aspect-square', glyph: 'YAYA' },
      { width: 'half', aspect: 'aspect-square', glyph: '3VIEW' },
      { width: 'half', aspect: 'aspect-square', glyph: 'EXPRESS' },
      { width: 'wide', aspect: 'aspect-[16/9]', glyph: 'SCENE' },
    ],
    result: 'IP 表情包上线首月下载 10w+，成为产品社区最具辨识度的视觉资产。',
    metrics: [
      { value: '10w+', label: '表情下载' },
      { value: '24', label: '表情数量' },
      { value: '01', label: 'IP 手册' },
    ],
  },
  {
    id: 'flora-atlas',
    index: '07',
    title: 'Flora Atlas',
    zh: '植物志 · 插画系列',
    category: 'illustration',
    year: '2026',
    role: 'Illustration / AIGC',
    tools: ['Stable Diffusion', 'Photoshop', 'Procreate'],
    tagline: '一本关于植物「性格」的虚构图鉴。',
    aspect: 'aspect-[4/5]',
    palette: P.flora,
    seed: 'flora-atlas',
    overview:
      '植物志是一套虚构的植物图鉴：每株植物都拥有拟人的性格与故事。用 AI 生成 + 手绘修正，平衡机器的想象力与人的温度。',
    concept:
      '如果植物会害羞、会等待、会假装枯萎 —— 图鉴记录的不是植物学，而是人类情绪的植物学。',
    visualDirection:
      '复古植物图谱的版式结构，内里却是超现实的 AI 生物。旧纸纹理与细线边框制造「古老文献」的错觉。',
    process:
      '先手绘物种草图定义结构，Stable Diffusion 生成质感与光影，再逐张回落到 Photoshop 手绘修正边缘与细节。',
    images: [
      { width: 'full', aspect: 'aspect-[21/9]', glyph: 'ATLAS' },
      { width: 'third', aspect: 'aspect-[3/4]', glyph: 'SP.01' },
      { width: 'third', aspect: 'aspect-[3/4]', glyph: 'SP.02' },
      { width: 'third', aspect: 'aspect-[3/4]', glyph: 'SP.03' },
      { width: 'wide', aspect: 'aspect-[16/9]', glyph: 'PLATE' },
    ],
    result: '系列以 NFT 形式发行，48 小时全部售罄。',
    metrics: [
      { value: '12', label: '物种数量' },
      { value: '48h', label: '售罄时间' },
      { value: '01', label: '图鉴手册' },
    ],
  },
  {
    id: 'cloud-portraits',
    index: '08',
    title: 'Cloud Portraits',
    zh: '云端肖像 · AI 写真',
    category: 'portrait',
    year: '2026',
    role: 'AIGC / Portrait Retouching / Creative Direction',
    tools: ['Midjourney', 'Stable Diffusion', 'Photoshop'],
    tagline: '用算法留住一束刚好落在肩上的光。',
    aspect: 'aspect-[3/4]',
    palette: P.cloud,
    seed: 'cloud-portraits',
    overview:
      '云端肖像是一组人像实验：以真实照片为锚点，让 AI 重构光线、季节与场景，在「像本人」与「像电影」之间找到平衡。',
    concept:
      '肖像的意义不是还原，而是放大某个瞬间的气质。AI 负责提供无限可能，摄影师负责说「就是这个」。',
    visualDirection:
      '电影级布光语言：逆光、窗光、黄昏侧光。皮肤保留真实质感，只修饰结构，不修饰灵魂。',
    process:
      '真实人像 → Midjourney 多版本重构 → Stable Diffusion 一致性控制（面部锚定）→ Photoshop 精修与统一色调。',
    images: [
      { width: 'full', aspect: 'aspect-[4/3]', glyph: 'PORTRAIT' },
      { width: 'half', aspect: 'aspect-[3/4]', glyph: 'A' },
      { width: 'half', aspect: 'aspect-[3/4]', glyph: 'B' },
      { width: 'wide', aspect: 'aspect-[16/9]', glyph: 'LIGHT' },
    ],
    beforeAfter: { beforeLabel: 'AI 原始生成', afterLabel: '最终精修' },
    result: '该项目方法论被整理成 3 篇教程，累计阅读 40w+，帮助了上千位创作者。',
    metrics: [
      { value: '40w+', label: '教程阅读' },
      { value: '3', label: '篇教程' },
      { value: '1000+', label: '受益创作者' },
    ],
  },
  {
    id: 'starbucks-ecommerce',
    index: '09',
    title: 'Stellar Nights',
    zh: '星野咖啡 · 电商视觉',
    category: 'commercial',
    year: '2026',
    role: 'Commercial Visual / AIGC / Art Direction',
    tools: ['Midjourney', 'ComfyUI', 'Photoshop', 'After Effects'],
    tagline: '把一罐咖啡卖成一段银河旅行。',
    aspect: 'aspect-[4/3]',
    palette: P.star,
    seed: 'stellar-nights',
    overview:
      '星野咖啡是一款主打「深夜灵感」的即饮咖啡。我们需要在 6 周内完成从新品上市到电商全渠道的视觉体系。',
    concept:
      '咖啡因不是提神，是「点亮深夜的星图」。产品包装与主视觉全部围绕星野展开：每一颗咖啡豆都是一颗恒星。',
    visualDirection:
      '深蓝夜空与暖金咖啡液的冷暖对撞，AI 生成星河质感的液体艺术，配合电商页的强转化信息层级。',
    process:
      '概念提案 → 产品棚拍 + AI 场景合成 → 主视觉与详情页设计 → 动态素材制作 → 全渠道投放素材。',
    images: [
      { width: 'full', aspect: 'aspect-[21/9]', glyph: 'NIGHTS' },
      { width: 'wide', aspect: 'aspect-[16/9]', glyph: 'HERO' },
      { width: 'half', aspect: 'aspect-square', glyph: 'PACK' },
      { width: 'half', aspect: 'aspect-square', glyph: 'DETAIL' },
    ],
    result: '新品上市首月电商 GMV 突破 200w，投放素材点击率高出行业均值 2.1 倍。',
    metrics: [
      { value: '200w', label: '首月 GMV' },
      { value: '2.1x', label: '点击率' },
      { value: '6w', label: '交付周期' },
    ],
  },
  {
    id: 'shape-of-sound',
    index: '10',
    title: 'Shape of Sound',
    zh: '声音的形状 · 实验影像',
    category: 'aifilm',
    year: '2026',
    role: 'AI Filmmaker / Motion Design / Sound Design',
    tools: ['Seedance', 'After Effects', 'ComfyUI'],
    tagline: '一段让声音「可见」的视听实验。',
    aspect: 'aspect-video',
    palette: P.shape,
    seed: 'shape-of-sound',
    video: FILM_CLIPS.showreel,
    overview:
      '《声音的形状》是一段 60 秒的视听实验：将环境录音的频谱，交由 AI 转译成不断生长的有机形态。',
    concept:
      '声音是看不见的雕塑。让算法成为雕塑家，把雨声、呼吸、城市噪音，塑造成各自独特的形态。',
    visualDirection:
      '黑色空间中的发光形态，粒子与流体质感，随音频振幅与频率实时演化。',
    process:
      '录音采样 → 频谱分析 → ComfyUI/Seedance 生成形态序列 → After Effects 音画同步合成。',
    images: [
      { width: 'full', aspect: 'aspect-video', glyph: 'SOUND' },
      { width: 'third', aspect: 'aspect-square', glyph: 'S1' },
      { width: 'third', aspect: 'aspect-square', glyph: 'S2' },
      { width: 'third', aspect: 'aspect-square', glyph: 'S3' },
    ],
    film: {
      story: '没有台词。只有声音变成光，光变成形状，形状又回到沉默。',
      character: '形态本身即是角色：每种声音都有属于自己的「性格曲线」。',
      timeline: [
        { time: '00:00', label: '雨声 · 液态', aspect: 'aspect-video', glyph: 'V1' },
        { time: '00:05', label: '呼吸 · 脉动', aspect: 'aspect-video', glyph: 'V2' },
        { time: '00:10', label: '城市 · 晶体', aspect: 'aspect-video', glyph: 'V3' },
        { time: '00:15', label: '沉默 · 消散', aspect: 'aspect-video', glyph: 'V4' },
      ],
    },
    result: '作品被选为国际声音艺术节开幕影片。',
    metrics: [
      { value: '60s', label: '片长' },
      { value: '03', label: '声音源' },
      { value: '01', label: '电影节' },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  导航                                                                */
/* ------------------------------------------------------------------ */

export type NavItem = {
  index: string
  path: string
  label: string
  zh: string
  palette: string[]
  description: string
}

export const navItems: NavItem[] = [
  {
    index: '01',
    path: '/',
    label: 'Home',
    zh: '首页',
    palette: P.lumora,
    description: 'AIGC 视觉设计师的个人作品集首页。',
  },
  {
    index: '02',
    path: '/work',
    label: 'Work',
    zh: '作品',
    palette: P.mist,
    description: '按分类浏览全部作品。',
  },
  {
    index: '03',
    path: '/about',
    label: 'About',
    zh: '关于',
    palette: P.cloud,
    description: '我是谁，以及我如何工作。',
  },
  {
    index: '04',
    path: '/contact',
    label: 'Contact',
    zh: '联系',
    palette: P.yu,
    description: '一起做点不一样的事。',
  },
]

/* ------------------------------------------------------------------ */
/*  工具 / 能力                                                          */
/* ------------------------------------------------------------------ */

export const tools = [
  { name: 'Photoshop', use: '图像合成与精修' },
  { name: 'Illustrator', use: '矢量图形与品牌系统' },
  { name: 'After Effects', use: '动效与影像合成' },
  { name: 'Premiere', use: '剪辑与成片' },
  { name: 'Figma', use: '界面设计与原型' },
  { name: 'Midjourney', use: '概念与氛围探索' },
  { name: 'Stable Diffusion', use: '可控生成与风格迁移' },
  { name: 'ComfyUI', use: '生成工作流搭建' },
  { name: 'Seedance', use: 'AI 视频生成' },
  { name: '即梦', use: 'AI 影像创作' },
  { name: 'ChatGPT', use: '创意策划与文案' },
]

export const skills = [
  { en: 'Visual Design', zh: '视觉设计' },
  { en: 'AIGC', zh: 'AI 视觉生成' },
  { en: 'AI Image Generation', zh: 'AI 图片生成' },
  { en: 'AI Film', zh: 'AI 影像制作' },
  { en: 'Creative Direction', zh: '创意策划' },
  { en: 'Brand Design', zh: '品牌设计' },
  { en: 'UI Design', zh: '界面设计' },
  { en: 'IP Design', zh: 'IP 设计' },
  { en: 'Motion Design', zh: '动态设计' },
  { en: 'Video Editing', zh: '视频剪辑' },
]

export const experience = [
  {
    period: '2024 — NOW',
    role: 'Freelance AIGC Visual Designer',
    org: 'Independent',
    note: '为消费品牌与独立创作者提供 AI 视觉与影像服务。',
  },
  {
    period: '2022 — 2024',
    role: 'Visual Designer',
    org: 'Creative Studio',
    note: '品牌视觉、界面设计与动效，涉及科技与生活方式领域。',
  },
  {
    period: '2020 — 2022',
    role: 'Graphic Designer',
    org: 'Design Agency',
    note: '从海报到 VI，完成从执行到主设的成长。',
  },
]

export const services = [
  { index: '01', en: 'VISUAL DESIGN', zh: '视觉设计' },
  { index: '02', en: 'AIGC', zh: 'AI视觉生成' },
  { index: '03', en: 'AI FILM', zh: 'AI影像制作' },
  { index: '04', en: 'BRAND DESIGN', zh: '品牌视觉' },
  { index: '05', en: 'UI DESIGN', zh: '界面设计' },
  { index: '06', en: 'CREATIVE DIRECTION', zh: '创意策划' },
]
