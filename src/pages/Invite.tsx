import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const ALLOWED = new Set([
  'joshua',
  'ian',
  'duane',
  'janus',
  'clinton',
  'mauen',
  'shane',
  'sheng'
])

const BESTMAN = new Set([
  'joshua'
])

const WOMAN = new Set([
  'shane',
  'sheng'
])

function TitleLines() {
  const lines = ["Kas! IT’S", "TIME TO", "SUIT UP"]
  return (
    <div aria-label="headline" className="headline">
      <AnimatePresence>
        {lines.map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.25 + i * 0.25, duration: 0.6, ease: 'easeOut' }}
          >
            {t}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function Bowtie() {
  return (
    <motion.img
      className="bowtie"
      src="/tie.png"   // ← your new image in /public
      alt="Suit mark"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: [0.9, 1.04, 1], opacity: 1, rotate: [0, -2, 2, 0] }}
      transition={{ delay: 1.1, duration: 0.8 }}
    />
  );
}

export default function Invite() {
  const { name } = useParams()
  const raw = (name ?? '')
  const value = raw.toLowerCase()
  const allowed = !raw || ALLOWED.has(value)
  const is_woman = WOMAN.has(value)
  const is_bestman = BESTMAN.has(value)
  // Pretty print (uppercase with spacing similar to mock)
  const pretty = raw ? raw.toUpperCase() : 'YOUR NAME'


  if (!allowed) {
   return  <></>
  }

  return (
    <div className="page">
      <div className="card">
        <motion.div
          className="tiny muted"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          DION &amp; LOVE
        </motion.div>

        <TitleLines />

        <Bowtie />

        <motion.div
          className="subhead"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {pretty}
        </motion.div>

        <motion.div
          className="question"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.6 }}
        >
          Will you be my {is_bestman ? "best man" : is_woman ? "groomsmaid" : "groomsman"}?
        </motion.div>

        <div className="divider-space"></div>

        <motion.div
          className="meta muted"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          Tuesday 2pm 08 September 2026
        </motion.div>
        <motion.div
          className="meta muted"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          St. John Marie Vianney Parish
        </motion.div>
        <motion.div
          className="meta muted"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
        >
          Tagaytay City
        </motion.div>

        <div className="divider-space"></div>
      </div>
    </div>
  )
}