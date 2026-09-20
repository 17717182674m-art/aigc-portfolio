/** 全局氛围层：缓慢漂移的暗色光晕 + 胶片噪点，营造神秘纵深感 */
export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="drift-1 absolute -left-40 -top-32 h-[55vh] w-[55vh] rounded-full bg-[#3a0a5a] opacity-[0.18] blur-[130px]" />
      <div className="drift-2 absolute -right-32 top-[35%] h-[60vh] w-[60vh] rounded-full bg-[#0a2a5a] opacity-[0.14] blur-[140px]" />
      <div className="drift-3 absolute bottom-[-15%] left-[25%] h-[50vh] w-[50vh] rounded-full bg-[#5a1a0a] opacity-[0.10] blur-[130px]" />
      <div className="noise-overlay absolute inset-0 opacity-[0.05] mix-blend-overlay" />
    </div>
  )
}
