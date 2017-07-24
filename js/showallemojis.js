jQuery(document).ready(function($) {
    // Create button.
    var btn = document.createElement( 'button' );
    btn.classList.add( 'Button' );
    // Append button to drop down.
    btn.appendChild( document.createTextNode( gdn.definition( 'ShowAll' ) ) );

    // Create container for button and hidden emojis
    var container = document.createElement( 'div' );
    container.classList.add( 'ShowAllEmojis' );
    container.appendChild( btn );
    emojiContainer = document.createElement( 'span' );
    emojiContainer.classList.add( 'HiddenEmojiContainer', 'Hidden' );

    // Loop throughs remaining emojis and add them to a hidden container.
    var hiddenEmojis = gdn.definition( 'HiddenEmojis' );
    var blueprint = document.createElement( 'span' );
    blueprint.classList.add(
        'editor-action',
        'editor-dialog-fire-close',
        'emoji-wrap'
    );
    blueprint.setAttribute( 'data-wysihtml5-command', 'insertHTML' );
    hiddenEmojis.forEach( function( emojiInfo ) {
        var emoji = blueprint.cloneNode( false );
        emoji.classList.add( 'emoji-' + emojiInfo['alias'] );
        emoji.setAttribute(
            'data-wysihtml5-command-value',
            ' :' + emojiInfo['alias'] + ': '
        );
        emoji.setAttribute( 'title', emojiInfo['alias'] );
        emoji.setAttribute(
            'data-editor',
            '{"action":"emoji","value":' + emojiInfo['alias'] + '}'
        );
        emoji.innerHTML = emojiInfo['html'];
        emojiContainer.appendChild( emoji );
    });

    // On click change text and show all emojis
    btn.addEventListener('click', function (evt) {
        // Toggle button text.
        var txt = this.textContent;
        if ( txt == gdn.definition( 'ShowAll' )) {
            this.textContent = gdn.definition( 'ShowLess' );
        } else {
            this.textContent = gdn.definition( 'ShowAll' );
        }
        // Toggle "more" emojis visibility.
        this.parentNode.nextSibling.classList.toggle( 'Hidden' );

        // Don't follow buttons action.
        evt.preventDefault();
        return false;
    });

    // Attach elements to drop down.
    $( '.editor-action-emoji > .editor-insert-dialog' ).append( container ).append( emojiContainer );
});
