import { useState } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons'

import s from './dropdown-menu.module.scss'

export const DropdownMenuDemo = () => {
  const [bookmarksChecked, setBookmarksChecked] = useState(true)
  const [urlsChecked, setUrlsChecked] = useState(false)
  const [person, setPerson] = useState('pedro')

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton" aria-label="Customise options">
          <HamburgerMenuIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.DropdownMenuContent} sideOffset={5}>
          <DropdownMenu.Item className={s.DropdownMenuItem}>
            New Tab <div className={s.RightSlot}>⌘+T</div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={s.DropdownMenuItem}>
            New Window <div className={s.RightSlot}>⌘+N</div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={s.DropdownMenuItem} disabled>
            New Private Window <div className={s.RightSlot}>⇧+⌘+N</div>
          </DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className={s.DropdownMenuSubTrigger}>
              More Tools
              <div className={s.RightSlot}>
                <ChevronRightIcon />
              </div>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className={s.DropdownMenuSubContent}
                sideOffset={2}
                alignOffset={-5}
              >
                <DropdownMenu.Item className={s.DropdownMenuItem}>
                  Save Page As… <div className={s.RightSlot}>⌘+S</div>
                </DropdownMenu.Item>
                <DropdownMenu.Item className={s.DropdownMenuItem}>
                  Create Shortcut…
                </DropdownMenu.Item>
                <DropdownMenu.Item className={s.DropdownMenuItem}>Name Window…</DropdownMenu.Item>
                <DropdownMenu.Separator className={s.DropdownMenu} />
                <DropdownMenu.Item className={s.DropdownMenuItem}>
                  Developer Tools
                </DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator className={s.DropdownMenuSeparator} />

          <DropdownMenu.CheckboxItem
            className={s.DropdownMenuCheckboxItem}
            checked={bookmarksChecked}
            onCheckedChange={setBookmarksChecked}
          >
            <DropdownMenu.ItemIndicator className={s.DropdownMenuItemIndicator}>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            Show Bookmarks <div className={s.RightSlot}>⌘+B</div>
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem
            className={s.DropdownMenuCheckboxItem}
            checked={urlsChecked}
            onCheckedChange={setUrlsChecked}
          >
            <DropdownMenu.ItemIndicator className={s.DropdownMenuItemIndicator}>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            Show Full URLs
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.Separator className={s.DropdownMenuSeparator} />

          <DropdownMenu.Label className={s.DropdownMenuLabel}>People</DropdownMenu.Label>
          <DropdownMenu.RadioGroup value={person} onValueChange={setPerson}>
            <DropdownMenu.RadioItem className={s.Separator} value="pedro">
              <DropdownMenu.ItemIndicator className={s.Separator}>
                <DotFilledIcon />
              </DropdownMenu.ItemIndicator>
              Pedro Duarte
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem className={s.Separator} value="colm">
              <DropdownMenu.ItemIndicator className={s.Separator}>
                <DotFilledIcon />
              </DropdownMenu.ItemIndicator>
              Colm Tuite
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Arrow className={s.Separator} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default DropdownMenuDemo
