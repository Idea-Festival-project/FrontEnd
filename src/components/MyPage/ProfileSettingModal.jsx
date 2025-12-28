import styles from './ProfileSettingModal.module.css'
import { useState } from 'react'

const profileImages = [
  { id: 1, src: '/Atti_noma.png', price: 0 },
  { id: 2, src: '/Atti_hat.png', price: 500 },
  { id: 3, src: '/Atti_ribon.png', price: 300 },
  { id: 4, src: '/Atti_glasses.png', price: 400 },
]

// 👉 임시: 보유 중인 프로필
const ownedProfileIds = [1, 3]

function ProfileSettingModal({ onClose, onSelect, currentPoints = 1000 }) {
  const [selected, setSelected] = useState(null)
  const [ownedProfiles, setOwnedProfiles] = useState(() => {
    const saved = localStorage.getItem('ownedProfiles')
    return saved ? JSON.parse(saved) : ownedProfileIds
  })
  const [points, setPoints] = useState(currentPoints)
  const [purchaseConfirm, setPurchaseConfirm] = useState(null)

  const handlePurchaseClick = (img) => {
    if (points >= img.price && !ownedProfiles.includes(img.id)) {
      setPurchaseConfirm(img)
    }
  }

  const confirmPurchase = () => {
    if (purchaseConfirm) {
      const newPoints = points - purchaseConfirm.price
      const newOwnedProfiles = [...ownedProfiles, purchaseConfirm.id]
      
      setPoints(newPoints)
      setOwnedProfiles(newOwnedProfiles)
      setSelected(purchaseConfirm.src)
      
      // localStorage에 저장
      localStorage.setItem('ownedProfiles', JSON.stringify(newOwnedProfiles))
      
      setPurchaseConfirm(null)
    }
  }

  const cancelPurchase = () => {
    setPurchaseConfirm(null)
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>프로필 이미지 선택</h2>
        <p className={styles.pointsDisplay}>보유 포인트: {points}P</p>

        <div className={styles.imageGrid}>
          {profileImages.map((img) => {
            const isOwned = ownedProfiles.includes(img.id)

            return (
              <button
                key={img.id}
                className={`${styles.imageBtn} ${
                  selected === img.src ? styles.active : ''
                } ${!isOwned ? styles.locked : ''}`}
                onClick={() => isOwned ? setSelected(img.src) : handlePurchaseClick(img)}
              >
                <img src={img.src} alt="profile" />
                {!isOwned && (
                  <div className={styles.lockOverlay}>
                    <span className={styles.lock}>🔒</span>
                    <span className={styles.price}>{img.price}P</span>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            취소
          </button>
          <button
            className={styles.saveBtn}
            disabled={!selected}
            onClick={() => onSelect(selected)}
          >
            저장
          </button>
        </div>
      </div>

      {purchaseConfirm && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmModal}>
            <h3>프로필 구매</h3>
            <p>정말로 이 프로필을 구매하시겠습니까?</p>
            <p className={styles.confirmPrice}>{purchaseConfirm.price} 포인트</p>
            <div className={styles.confirmFooter}>
              <button className={styles.cancelBtn} onClick={cancelPurchase}>
                취소
              </button>
              <button className={styles.saveBtn} onClick={confirmPurchase}>
                구매
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileSettingModal