(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const root = document.getElementById('linux-folders-root');
        const modal = document.getElementById('hub-folder-modal');
        if (!root || !modal || !window.LINUX_HUB_FOLDERS) return;

        const backdrop = modal.querySelector('.hub-folder-modal-backdrop');
        const panel = modal.querySelector('.hub-folder-modal-panel');
        const titleEl = document.getElementById('hub-folder-modal-title');
        const subtitleEl = document.getElementById('hub-folder-modal-subtitle');
        const gridEl = document.getElementById('hub-folder-modal-grid');
        const closeBtn = modal.querySelector('.hub-folder-modal-close');

        function escapeHtml(s) {
            return String(s)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
        }

        function previewCells(cards) {
            const slice = cards.slice(0, 4);
            while (slice.length < 4) slice.push({ glyph: '🐧' });
            return slice
                .map(
                    (c) =>
                        `<span class="hub-folder-preview-cell">${c.icon ? `<i class="${c.icon}"></i>` : c.imgIcon ? `<img src="${c.imgIcon}" style="width:1rem;height:1rem;">` : escapeHtml(c.glyph || '🐧')}</span>`
                )
                .join('');
        }

        function openModal(folder) {
            titleEl.textContent = folder.title;
            subtitleEl.textContent = folder.subtitle;
            gridEl.innerHTML = '';

            folder.cards.forEach((c) => {
                const card = document.createElement('article');
                card.className = 'command-card hub-folder-inner-card';

                const glyph = document.createElement('div');
                glyph.className = 'hub-folder-inner-glyph';
                glyph.setAttribute('aria-hidden', 'true');
                if (c.icon) {
                    glyph.innerHTML = `<i class="${c.icon}" style="font-size: 4rem; display: block; margin-bottom: 15px;"></i>`;
                } else if (c.imgIcon) {
                    glyph.innerHTML = `<img src="${c.imgIcon}" style="width: 4rem; height: 4rem; margin-bottom: 15px; display: block;">`;
                } else {
                    glyph.textContent = c.glyph || '🐧';
                }

                const h2 = document.createElement('h2');
                h2.textContent = c.title;

                const p = document.createElement('p');
                p.textContent = c.desc;

                const a = document.createElement('a');
                a.href = c.href;
                a.className = 'nav-btn transition-link';
                a.textContent = 'Search commands';

                card.append(glyph, h2, p, a);
                gridEl.appendChild(card);
            });

            modal.hidden = false;
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('hub-folder-modal-open');
            closeBtn.focus();
        }

        function closeModal() {
            modal.hidden = true;
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('hub-folder-modal-open');
        }

        function onClose() {
            closeModal();
            root.querySelectorAll('.hub-folder-card').forEach((b) =>
                b.setAttribute('aria-expanded', 'false')
            );
        }

        window.LINUX_HUB_FOLDERS.forEach((folder) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'hub-folder-card';
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-haspopup', 'dialog');
            btn.innerHTML =
                `<div class="hub-folder-preview">${previewCells(folder.cards)}</div>` +
                `<h2 class="hub-folder-title">${escapeHtml(folder.title)}</h2>` +
                `<p class="hub-folder-subtitle">${escapeHtml(folder.subtitle)}</p>` +
                `<span class="hub-folder-meta">${folder.cards.length} distros</span>`;
            btn.addEventListener('click', () => {
                openModal(folder);
                btn.setAttribute('aria-expanded', 'true');
            });
            root.appendChild(btn);
        });

        closeBtn.addEventListener('click', onClose);
        backdrop.addEventListener('click', onClose);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) onClose();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.hidden) onClose();
        });
    });
})();
