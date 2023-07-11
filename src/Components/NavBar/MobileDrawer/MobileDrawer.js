import { Button, Drawer, DrawerBody, DrawerContent, Stack, useDisclosure } from '@chakra-ui/react'
import { DocumentCollapse } from '../DocumentCollapse/DocumentCollapse'
import { ToggleButton } from '../ToggleButton/ToggleButton'

export const MobileDrawer = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  return (
    <>
      <ToggleButton
        isOpen={isOpen}
        onClick={onToggle}
        aria-label="Open menu"
        display={{
          base: 'inline-flex',
          lg: 'none',
        }}
      />
      <Drawer placement="right" isOpen={isOpen} onClose={onClose} >
        <DrawerContent>
          <DrawerBody p="4">
            <Stack spacing="1">
              <Button size="lg" variant="tertiary" justifyContent="start">
                Dashboard
              </Button>
              <Button size="lg" variant="tertiary" justifyContent="start">
                Analysis
              </Button>
              <Button size="lg" variant="tertiary" justifyContent="start">
                History
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}