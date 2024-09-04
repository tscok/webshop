import { ButtonGroup, Button } from '@mui/material'
import AddSharpIcon from '@mui/icons-material/AddSharp'
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp'

export const SummaryControls = ({
  onIncrease,
  onDecrease,
}: {
  onIncrease: () => void
  onDecrease: () => void
}) => (
  <ButtonGroup disableElevation variant="text">
    <Button onClick={onIncrease} size="small" aria-label="increase">
      <AddSharpIcon fontSize="small" />
    </Button>
    <Button onClick={onDecrease} size="small" aria-label="decrease">
      <RemoveSharpIcon fontSize="small" />
    </Button>
  </ButtonGroup>
)
