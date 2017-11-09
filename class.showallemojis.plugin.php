<?php
$PluginInfo['showAllEmojis'] = [
    'Name' => 'Show All Emojis',
    'Description' => 'Add button to reveal all emojis in dropdown',
    'Version' => '0.3.0',
    'RequiredApplications' => ['Vanilla' => '>= 2.3'],
    'RequiredPlugins' => ['editor' => '>= 1.8.1'],
    'MobileFriendly' => true,
    'HasLocale' => true,
    'Author' => 'Robin Jurinka',
    'AuthorUrl' => 'https://open.vanillaforums.com/profile/r_j',
    'License' => 'MIT'
];

/**
 * Adds a "show all" button to the emoji drop down.
 *
 * Shows a toggle that will expand the emoji drop down to show all available
 * emojis.
 */
class ShowAllEmojisPlugin extends Gdn_Plugin {
    public function base_render_before($sender) {
        // Attach to all pages.
        $sender->addJsFile('showallemojis.js', 'plugins/showAllEmojis');

        // Get all emojis currently shown in the editor.
        $sender->addDefinition(
            'EditorEmojis',
            array_values(Emoji::instance()->getEditorList())
        );
        // Add everything to definitios so that it can be retrieved via js.
        $sender->addDefinition('ShowAll', t('Show All'));
        $sender->addDefinition('ShowLess', t('Show Less'));
    }
}
