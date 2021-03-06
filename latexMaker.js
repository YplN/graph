function defineColors() {
  // let colors = []
  // for (let v of Vertices) {
  //   if (COLORS.includes(v.color) && !colors.includes(v.color)) {
  //     colors.push(v.color);
  //   }
  // }
  //
  // for (let e of Edges) {
  //   if (COLORS.includes(e.color) && !colors.includes(e.color)) {
  //     colors.push(e.color);
  //   }
  // }

  let colors = "";
  for (var i = 0; i < COLORS.length; i++) {
    colors += createColor(COLORS[i]) + "\n";
  }
  return colors + "\n";
}



function createColor(c) {
  let r = nf(red(c) / 255, 1, 2);
  let g = nf(green(c) / 255, 1, 2);
  let b = nf(blue(c) / 255, 1, 2);

  if (c == DEFAULT_COLOR) {
    r = 0;
    g = 0;
    b = 0;
  }

  if (c == BACKGROUND_COLOR) {
    r = 1;
    g = 1;
    b = 1;
  }

  return "\\definecolor{c" + COLORS.indexOf(c) + "}{rgb}{" + r + "," + g + "," + b + "}";
}



function createNodes() {
  let coordinates = "\t\t%drawing the vertices\n\t\t % HOW TO USE IT: \\node[scale = SCALE_VALUE, nodes={COLOR_OF_THE_NODE}{TEXT_LABEL}{POSITION_LABEL}{SIZE_NODE}] at  (COORDINATE)  {};\n\t\t%e.g. : \\node[scale = 0.5, nodes={red}{$v$}{above left}{}] at  (0,0)  {};\n";
  for (let v of Vertices) {
    coordinates += ("\t\t" + v.tikzifyNode() + "\n");
    coordinates += ("\t\t" + v.tikzifyLabel() + "\n\n");
  }
  return coordinates;
}


function createCoordinates() {
  let coordinates = "\t\t%defining the coordinates for the vertices\n";
  for (let v of Vertices) {
    coordinates += ("\t\t" + v.tikzifyCoordinate() + "\n");
  }
  return coordinates;
}

function createEdges() {
  let edgesString = "\t\t%drawing the edges\n";
  for (let e of Edges) {
    edgesString += ("\t\t" + e.tikzifyEdge() + "\n");
  }
  return edgesString;
}

function createDefines() {
  return "\t\t\\def\\scaleV{0.95}; %Scale of the label of vertices\n\t\t\\def\\scaleE{0.8}; %Scale of the label of edges\n\t\t\\def\\scaleN{1.3}; %Scale of the node\n";
}


function header() {
  return "\\documentclass[border=1mm, tikz,dvipsnames]{standalone} \n\\usepackage{tikz} \n\\usetikzlibrary{decorations.pathreplacing, decorations.markings} \n\\usetikzlibrary{calc} \n\\usepackage{xcolor}\n\n\\def\\empty{} \n\\pgfkeys{utils/.cd,\n	set if not empty/.code n args={3}{%\n		\\def\\arg{#2}%\n		\\ifx\\arg\\empty%\n		\\pgfkeys{#1={#3}}%\n		\\else%\n		\\pgfkeys{#1={#2}}%\n		\\fi%\n	},\n	set if labelpos not empty/.code n args={2}{%\n		\\def\\arg{#1}%\n		\\ifx\\arg\\empty%\n	\\else%\n		\\def\\argo{#2}%\n		\\ifx\\argo\\empty%\n		\\pgfkeys{/tikz/label={#1}}%\n		\\else%\n		\\pgfkeys{/tikz/label={#2}:{#1}}%\n		\\fi%\n		\\fi%\n	},\n	set if arrowpos not empty/.code n args={3}{%\n		\\def\\arg{#1}%\n		\\def\\arstyle{#3}%\n		\\ifx\\arstyle\\empty%\n		\\def\\arr{\\arrow[>=stealth]{>}}\n		\\else%\n		\\def\\arr{#3}\n		\\fi%\n		\\ifx\\arg\\empty%\n		\\pgfkeys{/pgf/decoration/mark={at position #2 with {\\arr}}}%\n		\\else%\n		\\pgfkeys{/pgf/decoration/mark={at position #1 with {\\arr}}}%\n		\\fi%\n	},\n}\n\\tikzset{\n	nodes/.style n args={4}{\n		draw ,circle,outer sep=0.7mm,\n		/utils/set if not empty={/tikz/fill}{#1}{black},\n		/utils/set if not empty={/tikz/minimum size}{#4}{5},\n		/utils/set if labelpos not empty={#2}{#3},\n		line width = 0.7pt\n},\n	arc/.style n args={3}{\n		postaction={\n			decorate,\n			decoration={markings,\n				/utils/set if arrowpos not empty={#1}{1}{}%\n			}\n		},\n		/utils/set if not empty={/tikz/line width}{#2}{0.7pt},\n		{#3}\n	}\n}\n\n";
}


function preHeader() {
  return "%LaTeX code generated using https://ypln.github.io/graph/ \n%You can reload this graph on the website using the code: " + createCode() + "\n";
}