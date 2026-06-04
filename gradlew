#!/usr/bin/env sh

#
# Copyright 2015 the original author or authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

##############################################################################
##
##  Gradle start up script for UN*X
##
##############################################################################

# Attempt to set APP_HOME
# Resolve links: $0 may be a symlink
app_path="$0"

# Need this for daisy-chained symlinks.
while
    APP_HOME=${app_path%"${app_path##*/}"}
    [ -h "$app_path" ]
do
    app_path=$(readlink "$app_path")
    APP_HOME=${app_path%"${app_path##*/}"}${APP_HOME#"${app_path%/*}/"}
done

APP_HOME=$(cd "${APP_HOME:-.}" && pwd -P)
cd "$APP_HOME" || exit

# Use the maximum available, or set MAX_FD != maximum.
MAX_FD=maximum

warn() {
    echo "$@" >&2
}

die() {
    echo
    echo "$@" >&2
    exit 1
}

# OS specific support (must be 'true' or 'false').
cygwin=false
msys=false
darwin=false
case "$(uname)" in
  CYGWIN* )
    cygwin=true
    ;;
  Darwin* )
    darwin=true
    ;;
  MSYS* | MINGW* )
    msys=true
    ;;
esac

if [ "$1" = "-q" ]; then
    PROJECT_NAME="-q"
    shift
fi

# Disallow name that look like flags.
for arg; do
    case "$arg" in
      -*)  echo "error: unsupported option: $arg" >&2
           exit 1
           ;;
    esac
done

# Resolve the Java home directory.
if [ -n "$JAVA_HOME" ]; then
    if [ -x "$JAVA_HOME/jre/sh/java" ]; then
        # IBM's JDK on AIX uses strange locations for the executables
        JAVACMD=$JAVA_HOME/jre/sh/java
    else
        JAVACMD=$JAVA_HOME/bin/java
    fi
    if [ ! -x "$JAVACMD" ]; then
        die "ERROR: JAVA_HOME is set to an invalid directory: $JAVA_HOME

Please set the JAVA_HOME variable in your environment to match the
location of your Java installation."
    fi
else
    JAVACMD=java
    which java >/dev/null 2>&1 || die "ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.

Please set the JAVA_HOME variable in your environment to match the
location of your Java installation."
fi

# Increase the maximum file descriptors if we can.
if ! "$cygwin" && ! "$darwin" && ! "$msys" ; then
    case $MAX_FD in #(
      max*)
        # In POSIX sh, ulimit -H is undefined. That's why the result is checked to see if it worked.
        # shellcheck disable=SC3045
        MAX_FD=$(ulimit -H -n) ||
            warn "Could not query maximum file descriptor limit"
    esac
    case $MAX_FD in  #(
      '' | soft) :;; #(
      *)
        # In POSIX sh, ulimit -n may round down to even fewer than $MAX_FD (negative rounding)
        # shellcheck disable=SC3045
        ulimit -n "$MAX_FD" ||
            warn "Could not set maximum file descriptor limit to $MAX_FD"
    esac
fi

# Escape application args
for i in "$@" ; do
    arg="$i"
    case $arg in                                #(
      *)   printf '%s\n' "$arg" | sed "s/'/'\\\\''/g;1s/^/'/;\$s/\$/'/" ;; # (end
    esac
done | tr '\n' ' ' | xargs -0 printf '%s' >/tmp/launcher_args.txt

PROJECT_NAME="-J9" APP_HOME="$APP_HOME" \
    eval exec '"$JAVACMD"' \
    -classpath '"$APP_HOME"/gradle/wrapper/gradle-wrapper.jar' \
    org.gradle.wrapper.GradleWrapperMain "$@"
