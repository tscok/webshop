import { IconButton } from '@mui/material'
import IncreaseIcon from '@mui/icons-material/AddCircleOutline'
import DecreaseIcon from '@mui/icons-material/RemoveCircleOutline'

export const SummaryControls = ({
  onIncrease,
  onDecrease,
}: {
  onIncrease: () => void
  onDecrease: () => void
}) => (
  <div>
    <IconButton
      aria-label="increase"
      color="primary"
      onClick={onIncrease}
      size="small"
    >
      <IncreaseIcon fontSize="small" />
    </IconButton>
    <IconButton
      aria-label="decrease"
      color="primary"
      onClick={onDecrease}
      size="small"
    >
      <DecreaseIcon fontSize="small" />
    </IconButton>
  </div>
)
